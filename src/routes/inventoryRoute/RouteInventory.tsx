import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const InventoryPage = lazy(() => import("@/pages/inventoryPage/InventoryPage"));

export const RouteInventoryPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/inventory" element={<InventoryPage />} />
  </Route>
);