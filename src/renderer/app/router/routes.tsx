import type { ComponentType } from "react";

import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { LandingPage } from "../../pages/landing/LandingPage";

export interface AppRoute {
  component: ComponentType;
  id: string;
  path: string;
  usesShell: boolean;
}

export const routes: AppRoute[] = [
  {
    id: "landing",
    path: "/",
    usesShell: false,
    component: LandingPage
  },
  {
    id: "dashboard",
    path: "/dashboard",
    usesShell: true,
    component: DashboardPage
  }
];
