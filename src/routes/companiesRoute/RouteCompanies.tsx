import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const CompaniesPage = lazy(() => import("@/pages/companiesPage/companiesPage"));

export const RouteCompaniesPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/companies" element={<CompaniesPage />} />
  </Route>
);