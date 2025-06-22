import { Route } from "react-router-dom"
import { lazy } from "react"

const UnitOfMeasurementsPage = lazy(() => import("@/pages/unit_of_measurement/UnitOfMeasurementPage"))

export const RouteUnitOfMeasurementsPage = () => (
  <Route path="/unitOfMeasurementsPage" element={<UnitOfMeasurementsPage />} />
);