import { Route } from "react-router-dom"
import { lazy } from "react"

const UsersPage = lazy(() => import("@/pages/usersPage/UsersPage"))

export const RouteUsersPage = () => (
  <Route path="/users" element={<UsersPage />} />
);