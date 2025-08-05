import { Route } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const UsersPage = lazy(() => import("@/pages/usersPage/UsersPage"));

export const RouteUsersPage = () => (
  <Route element={<ProtectedRoute roles={["super_admin","admin"]} />}>
    <Route path="/users" element={<UsersPage />} />
  </Route>
);
