import type { AppRoute } from "../router/routes";

interface AppShellProps {
  activeRoute: AppRoute;
}

export const AppShell = ({ activeRoute }: AppShellProps) => {
  const ActivePage = activeRoute.component;

  if (!activeRoute.usesShell) {
    return <ActivePage />;
  }

  return (
    <main>
      <ActivePage />
    </main>
  );
};
