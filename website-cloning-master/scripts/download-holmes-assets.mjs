/**
 * Downloads key image assets from try-holmes.com Framer HTML (run after updating URL list).
 * Usage: node scripts/download-holmes-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

const outDir = path.join(process.cwd(), "public/images/holmes");

const assets = [
  ["logo.png", "https://framerusercontent.com/images/YVudaxszWmzvMWsYV84KddIOI.png?width=395&height=632"],
  ["hero-bg.jpg", "https://framerusercontent.com/images/Jd2WZiNyrj4Ed7ua0bk3kY2Y04.jpg?width=2800&height=2800"],
  ["feature-1.jpg", "https://framerusercontent.com/images/x6xkEwZKT74Rhoc7VKJdyN5urk.jpg?width=1813&height=1973"],
  ["feature-2.jpg", "https://framerusercontent.com/images/BDiqoTQ17rnMhrRYkHqveH19olU.jpg?width=2800&height=2041"],
  ["feature-3.jpg", "https://framerusercontent.com/images/cRqFpqS2awUChopI8LW6RQG7iEI.jpg?width=687&height=1105"],
  ["card-content.jpg", "https://framerusercontent.com/images/ivbQ03mjsXYne87pKlKv7LdFa4.jpg?width=1200&height=1200"],
  ["card-coding.jpg", "https://framerusercontent.com/images/6uCi2aGW3k08t9OIzRSSy2If1k.jpg?width=1200&height=1200"],
  ["card-research.jpg", "https://framerusercontent.com/images/JeX6PtaUBRwqHmghekhsFjcREEc.jpg?width=1200&height=1200"],
  ["card-focus.jpg", "https://framerusercontent.com/images/OyFjMJQY2tIYNZJa3S6NeRFuhVs.jpg?width=1200&height=1200"],
  ["observe.jpg", "https://framerusercontent.com/images/nsstxmgFBzLbZV1Xtj5xFl2TZc.jpg?width=1200&height=1200"],
  ["slash-bg.jpg", "https://framerusercontent.com/images/9M2MsFJefL9DNNWXju9iHz4IcKw.jpg?width=2000&height=2000"],
  ["capabilities.jpg", "https://framerusercontent.com/images/22YrcZ1w7B7tdu3iKeuWWXszI.jpg?width=2000&height=2000"],
  ["pricing-bg.jpg", "https://framerusercontent.com/images/VT3CBUKk06MAi2R8MIg4W934WyM.jpg?width=2000&height=2000"],
  ["favicon-source.jpg", "https://www.try-holmes.com/favicon.jpg"],
];

async function download(name, url) {
  const dest = path.join(outDir, name);
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; HolmesClone/1.0)" },
  });
  if (!res.ok) throw new Error(`${name}: ${res.status} ${res.statusText}`);
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok", name);
}

fs.mkdirSync(outDir, { recursive: true });

const batch = 4;
for (let i = 0; i < assets.length; i += batch) {
  const chunk = assets.slice(i, i + batch);
  await Promise.all(chunk.map(([n, u]) => download(n, u)));
}

console.log("Done:", outDir);
