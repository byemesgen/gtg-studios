/**
 * Set example click-through URLs on the seeded hero slides.
 * Run with: npx sanity exec scripts/set-slide-urls.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-06-01" });

async function main() {
  await client
    .patch("homePage")
    .set({
      "heroSlides[_key==\"slide1\"].url": "https://www.youtube.com/watch?v=l4qXAeMAWUI",
      "heroSlides[_key==\"slide2\"].url": "https://www.youtube.com/watch?v=Bcpu-jqAL6w",
      "heroSlides[_key==\"slide3\"].url": "/work",
    })
    .commit();
  console.log("✓ click-through URLs set on all 3 slides");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
