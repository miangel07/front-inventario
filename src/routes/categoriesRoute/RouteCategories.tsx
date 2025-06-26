import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const CategoriesPage = lazy(() => import("@/pages/categoriesPage/CategoriesPage"));

export const RouteCategoriesPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/categories" element={<CategoriesPage />} />
  </Route>
);