import { Route } from "react-router-dom"
import { lazy } from "react"

const CategoriesPage = lazy(() => import("@/pages/categoriesPage/CategoriesPage"))

export const RouteCategoriesPage = () => (
  <Route path="/categories" element={<CategoriesPage />} />
);