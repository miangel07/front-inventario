import { Route } from "react-router-dom";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

export const RouteUnauthorizedPage = () => (
  <Route path="/unauthorized" element={<UnauthorizedPage />} />
);
