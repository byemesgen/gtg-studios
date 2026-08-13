/**
 * One-off: replace homePage.hero with the heroSlides carousel.
 * Run with: npx sanity exec scripts/migrate-hero-carousel.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-06-01" });

async function main() {
  await client
    .patch("homePage")
    .unset(["hero"])
    .set({
      heroSlides: [
        {
          _type: "heroSlide",
          _key: "slide1",
          company: "Nike",
          projectName: "Behind the Design",
          videoId: "l4qXAeMAWUI",
          url: "",
        },
        {
          _type: "heroSlide",
          _key: "slide2",
          company: "Amazon Prime Video",
          projectName: "Meal Ticket",
          videoId: "Bcpu-jqAL6w",
          url: "",
        },
        {
          _type: "heroSlide",
          _key: "slide3",
          company: "GTG Studios",
          projectName: "Showreel",
          videoId: "l4qXAeMAWUI",
          url: "",
        },
      ],
    })
    .commit();
  console.log("✓ homePage.hero replaced with 3 heroSlides");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
