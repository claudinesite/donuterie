import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(
  process.cwd(),
  "public",
  "sites",
  "madie-es-a92149a5",
  "root-8a5edab2",
  "assets",
);

const assets = [
  {
    name: "story-ig.mp4",
    url: "https://madie.cdn.prismic.io/madie/aheh5LK9tuLqENDA_madie-ig-compressed.mp4",
  },
  {
    name: "icon.png",
    url: "https://madie.es/icon.png?icon.0pnu2.o5l7o.e.png",
  },
  {
    name: "apple-icon.png",
    url: "https://madie.es/apple-icon.png?apple-icon.0kr2y4kuov8do.png",
  },
];

async function download(asset) {
  const response = await fetch(asset.url);

  if (!response.ok) {
    throw new Error(`${asset.name}: HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(join(outputDirectory, asset.name), buffer);
  return `${asset.name} (${buffer.length} bytes)`;
}

await mkdir(outputDirectory, { recursive: true });

const settled = await Promise.allSettled(assets.map(download));
const failures = settled.filter((result) => result.status === "rejected");

for (const result of settled) {
  if (result.status === "fulfilled") {
    console.log(`Downloaded ${result.value}`);
  } else {
    console.error(result.reason instanceof Error ? result.reason.message : result.reason);
  }
}

if (failures.length > 0) {
  process.exitCode = 1;
}
