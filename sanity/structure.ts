import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  type: string
) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "Site Settings", "siteSettings"),
      S.divider(),
      singleton(S, "Hero", "hero"),
      singleton(S, "Home Page", "homePage"),
      singleton(S, "Work Page", "workPage"),
      singleton(S, "About Page", "aboutPage"),
      singleton(S, "Footer", "footer"),
      S.divider(),
      S.documentTypeListItem("workCategory").title("Work Categories"),
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      singleton(S, "Privacy Page", "privacyPage"),
      singleton(S, "Terms of Service", "termsPage"),
    ]);
