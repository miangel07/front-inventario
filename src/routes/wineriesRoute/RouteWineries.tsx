import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const WineriesPage = lazy(() => import("@/pages/wineriesPage/WineriesPage"));

export const RouteWineriesPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/wineries" element={<WineriesPage />} />
  </Route>
);