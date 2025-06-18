import {  Suspense } from "react";
import {  Routes } from "react-router-dom";
import { RouteHomePage } from "./homeRoute/RouteHome";
import { RouteLoginPage } from "./loginRoute/RouteLogin";
import { RouteUsersPage } from "./usersRoute/RouteUsers";
import { RouteWineriesPage } from "./wineriesRoute/RouteWineries";
import { RouteCategoriesPage } from "./categoriesRoute/RouteCategories";





const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col lg:flex-row h-full">
          {/* Left Sidebar - Mobile Header */}
          <div className="w-full lg:hidden border-b-2 border-slate-600 bg-gray-100 p-4 space-y-4">
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-5/6 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-4/5 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-full bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded-md" />
          </div>

          {/* Left Sidebar - Desktop */}
          <div className="hidden lg:block w-[240px] h-screen bg-gray-100 p-4 space-y-4 border-r-2 border-slate-200">
            <div className="h-8 w-3/4 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-5/6 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-4/5 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-full bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded-md" />
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 p-6 space-y-6 h-screen">
            <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-24 w-full bg-gray-300 animate-pulse rounded-md" />
            <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md" />
            <div className="h-12 w-5/6 bg-gray-300 animate-pulse rounded-md" />
          </div>
        </div>
      }
    >

        <Routes>
        {RouteLoginPage()}
        {RouteHomePage()}
        {RouteUsersPage()}
        {RouteWineriesPage()}
        {RouteCategoriesPage()}
        </Routes>

    </Suspense>
  );
};


export default Router