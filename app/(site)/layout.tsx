import Sidebar from "@/app/components/Sidebar";
import LoadingScreen from "@/app/components/LoadingScreen";
import { TransitionProvider } from "@/app/contexts/TransitionContext";
import { getSiteSettings } from "@/sanity/lib/queries";

// Re-render pages with fresh Sanity content at most every 60s in production,
// so publishing in the Studio goes live without a redeploy.
export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <TransitionProvider>
      <LoadingScreen />
      <Sidebar settings={settings} />
      <div className="page-offset">{children}</div>
    </TransitionProvider>
  );
}
