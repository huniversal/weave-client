import { useCallback, useEffect, useState } from "react";

import type { AppRoute } from "./routes";

const normalizeHashPath = () => {
  const hash = window.location.hash.replace(/^#/, "");

  if (hash.length === 0) {
    return "/";
  }

  return hash.startsWith("/") ? hash : `/${hash}`;
};

const findRoute = (routes: AppRoute[], path: string) => {
  const fallbackRoute = routes[0];

  if (fallbackRoute == null) {
    throw new Error("At least one route must be registered.");
  }

  return routes.find((route) => route.path === path) ?? fallbackRoute;
};

export const useHashRoute = (routes: AppRoute[]) => {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(() => {
    return findRoute(routes, normalizeHashPath());
  });

  useEffect(() => {
    if (window.location.hash.length === 0) {
      window.location.hash = routes[0]?.path ?? "/";
    }

    const syncRoute = () => {
      const nextRoute = findRoute(routes, normalizeHashPath());
      setActiveRoute(nextRoute);
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
    };
  }, [routes]);

  const navigate = useCallback((path: string) => {
    if (normalizeHashPath() === path) {
      return;
    }

    window.location.hash = path;
  }, []);

  return {
    activeRoute,
    navigate
  };
};
