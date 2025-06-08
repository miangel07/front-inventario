import { Route } from "react-router-dom"
import { lazy } from "react"

const LoginPage = lazy(() => import("@/pages/loginPage/LoginPage"))

export const RouteLoginPage = () => {
    return (
        <>
            <Route element={<LoginPage />} path="/" />
        </>
    )

}