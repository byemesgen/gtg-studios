/**
 * One-off migration:
 * 1. Copy the standalone "hero" document's fields into homePage.hero, then delete it.
 * 2. Upload the sidebar icon + wordmark SVGs and attach them to Site Settings.
 * Run with: npx sanity exec scripts/migrate-hero-logos.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { readFileSync } from "fs";
import { join } from "path";

const client = getCliClient({ apiVersion: "2025-06-01" });

async function main() {
  // 1. Hero → homePage.hero
  const hero = await client.getDocument("hero");
  await client
    .patch("homePage")
    .set({
      hero: {
        backgroundVideoId: (hero?.backgroundVideoId as string) ?? "l4qXAeMAWUI",
        showreelVideoId: (hero?.showreelVideoId as string) ?? "l4qXAeMAWUI",
        playButtonLabel: (hero?.playButtonLabel as string) ?? "Play Showreel",
      },
    })
    .commit();
  if (hero) {
    await client.delete("hero");
    console.log("✓ hero merged into homePage and deleted");
  } else {
    console.log("✓ homePage.hero set (no standalone hero doc found)");
  }

  // 2. Logos → siteSettings
  const sidebarBuf = readFileSync(join(process.cwd(), "public/logo.svg"));
  const sidebarAsset = await client.assets.upload("image", sidebarBuf, {
    filename: "sidebar-logo.svg",
  });
  const wordmarkBuf = readFileSync(join(process.cwd(), "public/gtg-wordmark.svg"));
  const wordmarkAsset = await client.assets.upload("image", wordmarkBuf, {
    filename: "gtg-wordmark.svg",
  });
  await client
    .patch("siteSettings")
    .set({
      sidebarLogo: {
        _type: "image",
        asset: { _type: "reference", _ref: sidebarAsset._id },
      },
      wordmarkLogo: {
        _type: "image",
        asset: { _type: "reference", _ref: wordmarkAsset._id },
      },
    })
    .commit();
  console.log("✓ sidebar + wordmark logos uploaded to Site Settings");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
