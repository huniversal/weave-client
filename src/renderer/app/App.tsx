import { AppShell } from "./shell/AppShell";
import { routes } from "./router/routes";
import { useHashRoute } from "./router/useHashRoute";

export const App = () => {
  const { activeRoute } = useHashRoute(routes);

  return <AppShell activeRoute={activeRoute} />;
};
