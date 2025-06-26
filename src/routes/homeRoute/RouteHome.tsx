import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const HomePage = lazy(() => import("@/pages/homePage/HomePage"));

export const RouteHomePage = () => {
  return (
    <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
      <Route path="/home" element={<HomePage />} />
    </Route>
  );
};
