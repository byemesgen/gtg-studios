import WorkClient from "./WorkClient";
import { getProjects, getWorkCategories, getWorkPage } from "@/sanity/lib/queries";

export default async function WorkPage() {
  const [workPage, categories, projects] = await Promise.all([
    getWorkPage().catch(() => null),
    getWorkCategories().catch(() => []),
    getProjects().catch(() => []),
  ]);

  return (
    <WorkClient
      heading={workPage?.heading ?? "WORK"}
      categories={categories}
      projects={projects}
    />
  );
}
