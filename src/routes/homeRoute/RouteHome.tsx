import { Route } from "react-router-dom"
import { lazy } from "react"

const HomePage = lazy(() => import("@/pages/homePage/HomePage"))

export const RouteHomePage = () => {
    return (
        <>
            <Route element={<HomePage />} path="/home" />
        </>
    )

}