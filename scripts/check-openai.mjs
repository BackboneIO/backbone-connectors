#!/usr/bin/env node
// Checks plugin.json + mcp.json against the OpenAI plugin submission limits
// (developers.openai.com/plugins/deploy/submission, read 25/10/2026). No dependencies.
// Usage: node scripts/check-openai.mjs [--final]   (--final also fails on placeholders)
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const final = process.argv.includes("--final");
const plugin = JSON.parse(readFileSync(join(root, "plugin.json"), "utf8"));
const mcp = JSON.parse(readFileSync(join(root, "mcp.json"), "utf8"));
const errors = [], warnings = [], ok = [];
const len = (s) => [...(s ?? "")].length;
const max = (label, s, n) => (s == null ? errors.push(`${label}: missing`) : len(s) > n ? errors.push(`${label}: ${len(s)} > ${n}`) : ok.push(`${label}: ${len(s)}/${n}`));

if (plugin.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") errors.push("$schema: not the Agent Plugins 1.0.0 schema");
const oa = plugin.extensions?.["com.openai"] ?? {};
const i = oa.interface ?? {};
max("displayName", i.displayName, 30);
max("shortDescription", i.shortDescription, 30);
max("longDescription", i.longDescription, 4000);
max("developerName", i.developerName, 80);
if (!i.category) errors.push("category: missing");
if (!/limitation/i.test(i.longDescription ?? "")) warnings.push("longDescription: no limitations paragraph");
(i.capabilities ?? []).length > 20 && errors.push("capabilities: more than 20");
(i.capabilities ?? []).forEach((c, n) => max(`capabilities[${n}]`, c, 120));
for (const k of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
  const u = i[k];
  if (!u) errors.push(`${k}: missing`);
  else if (!u.startsWith("https://")) errors.push(`${k}: not HTTPS`);
  else max(k, u, 1024);
}
const dp = i.defaultPrompt ?? [];
if (dp.length > 3) errors.push("defaultPrompt: more than 3");
if (new Set(dp).size !== dp.length) errors.push("defaultPrompt: duplicates");
dp.forEach((p, n) => { max(`defaultPrompt[${n}]`, p, 128); if (/@\w/.test(p)) errors.push(`defaultPrompt[${n}]: @mention`); });

const lum = (hex) => { const c = hex.slice(1).match(/../g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
for (const [k, bg] of [["brandColor", "#FFFFFF"], ["brandColorDark", "#212121"]]) {
  const c = i[k];
  if (c == null) { if (k === "brandColor") errors.push("brandColor: missing"); continue; }
  if (!/^#[0-9A-Fa-f]{6}$/.test(c)) { errors.push(`${k}: not #RRGGBB`); continue; }
  const r = contrast(c, bg);
  r >= 2 ? ok.push(`${k} ${c} vs ${bg}: ${r.toFixed(2)}:1`) : errors.push(`${k} ${c} vs ${bg}: ${r.toFixed(2)}:1 < 2:1`);
}
for (const k of ["logo", "composerIcon", "logoDark", "composerIconDark"]) {
  if (!i[k]) { if (k === "logo") errors.push("logo: missing"); continue; }
  const f = join(root, i[k]);
  if (!existsSync(f)) { errors.push(`${k}: file ${i[k]} missing`); continue; }
  const b = readFileSync(f);
  if (b.length > 5 * 1024 * 1024) errors.push(`${k}: > 5 MiB`);
  if (b.subarray(1, 4).toString() === "PNG") {
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    w !== h ? errors.push(`${k}: not square (${w}x${h})`) : w < 48 || w > 4096 ? errors.push(`${k}: ${w}px out of 48–4096`) : ok.push(`${k}: ${w}x${h} PNG`);
  }
}

const r = oa.review ?? {};
const pos = r.test_cases?.positive ?? [], neg = r.test_cases?.negative ?? [];
pos.length === 5 ? ok.push("positive test cases: 5") : errors.push(`positive test cases: ${pos.length}, need exactly 5`);
neg.length === 3 ? ok.push("negative test cases: 3") : errors.push(`negative test cases: ${neg.length}, need exactly 3`);
pos.forEach((t, n) => ["description", "prompt", "tools_triggered", "expected_behavior"].forEach((f) => !t[f] && errors.push(`positive[${n}].${f}: missing`)));
neg.forEach((t, n) => ["description", "prompt"].forEach((f) => !t[f] && errors.push(`negative[${n}].${f}: missing`)));
if (typeof r.commerce !== "boolean") errors.push("review.commerce: not boolean");
if (!r.demo_recording_url) errors.push("review.demo_recording_url: missing");
else if (/REPLACE/i.test(r.demo_recording_url)) (final ? errors : warnings).push("review.demo_recording_url: still the placeholder");
for (const bad of ["test_credentials", "reviewer_instructions"]) if (JSON.stringify(plugin).includes(`"${bad}"`)) errors.push(`${bad}: not allowed in the package`);
if (plugin.hooks || plugin.apps) errors.push("hooks/apps: not allowed");

const pub = oa.publication ?? {};
if (pub.countries && !pub.countries.every((c) => /^[A-Z]{2}$/.test(c))) errors.push("publication.countries: not uppercase ISO codes");
if (!pub.release_notes) warnings.push("publication.release_notes: missing");
for (const [loc, t] of Object.entries(pub.translations ?? {})) {
  if (!loc) errors.push("translations: empty locale key");
  if (t.subtitle != null) { max(`translations.${loc}.subtitle`, t.subtitle, 30); if (/\n/.test(t.subtitle)) errors.push(`translations.${loc}.subtitle: not single line`); }
  if (t.description != null) max(`translations.${loc}.description`, t.description, 4000);
}

const servers = Object.values(mcp.mcpServers ?? {});
servers.length === 1 ? ok.push("mcp.json: one remote server") : errors.push(`mcp.json: ${servers.length} servers, need exactly 1`);
for (const s of servers) {
  if (!s.url?.startsWith("https://")) errors.push("mcp.json: server URL not HTTPS");
  if (s.headers && Object.keys(s.headers).length) errors.push("mcp.json: nonempty headers");
  if (JSON.stringify(s).includes("clientSecret")) errors.push("mcp.json: clientSecret not allowed");
  if (s.extensions?.["com.openai"]?.auth?.client?.mode !== "dcr") warnings.push("mcp.json: auth client mode is not dcr");
}
if (JSON.stringify(plugin).includes("OWNER/REPO")) warnings.push("repository: OWNER/REPO placeholder (build-zip.sh drops it from the ZIP)");

ok.forEach((m) => console.log("  ok   " + m));
warnings.forEach((m) => console.log("  warn " + m));
errors.forEach((m) => console.log("  FAIL " + m));
console.log(errors.length ? `\n${errors.length} error(s)` : `\nall limits ok (${warnings.length} warning(s))`);
process.exit(errors.length ? 1 : 0);
