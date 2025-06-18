import { Route } from "react-router-dom"
import { lazy } from "react"

const WineriesPage = lazy(() => import("@/pages/wineriesPage/WineriesPage"))

export const RouteWineriesPage = () => (
  <Route path="/wineries" element={<WineriesPage />} />
);