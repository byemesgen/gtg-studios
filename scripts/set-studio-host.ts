/**
 * Point the Sanity dashboard's "Open Sanity Studio" button at the /studio path.
 * Run with: npx sanity exec scripts/set-studio-host.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-06-01" });

async function main() {
  const res = await client.request({
    uri: "/projects/co7e2swz",
    method: "PATCH",
    body: { metadata: { externalStudioHost: "https://gtg-studios.vercel.app/studio" } },
  });
  console.log("✓ externalStudioHost =", res?.metadata?.externalStudioHost);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
