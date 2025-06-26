import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const UnitOfMeasurementsPage = lazy(() => import("@/pages/unit_of_measurement/UnitOfMeasurementPage"));

export const RouteUnitOfMeasurementsPage = () => (
  <Route element={<ProtectedRoute roles={["admin", "storage_admin", "super_admin"]} />}>
    <Route path="/unitOfMeasurements" element={<UnitOfMeasurementsPage />} />
  </Route>
);