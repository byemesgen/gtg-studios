/**
 * One-off: remove the leading h2 block from privacy/terms bodies
 * (it duplicated the page title).
 * Run with: npx sanity exec scripts/fix-legal-headings.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-06-01" });

async function main() {
  for (const id of ["privacyPage", "termsPage"]) {
    const doc = await client.getDocument(id);
    if (!doc?.body) continue;
    const body = doc.body as { style?: string }[];
    if (body[0]?.style === "h2") {
      await client.patch(id).set({ body: body.slice(1) }).commit();
      console.log(`✓ ${id} — removed duplicate heading`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
