import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const ProductsPage = lazy(() => import("@/pages/productsPage/ProductsPage"));

export const RouteProductsPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/products" element={<ProductsPage />} />
  </Route>
);