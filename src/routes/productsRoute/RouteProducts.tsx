import { Route } from "react-router-dom"
import { lazy } from "react"

const ProductsPage = lazy(() => import("@/pages/productsPage/ProductsPage"))

export const RouteProductsPage = () => (
  <Route path="/products" element={<ProductsPage />} />
);