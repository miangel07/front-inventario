import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./slice/usersSlice";
import { WineriesSlice } from "./slice/wineriesSlice";
import { CategoriesSlice } from "./slice/categoriesSlice";
import { UnitOfMeasurementSlice } from "./slice/unitOfMeasurementSlice";
import { ProductsSlice } from "./slice/productsSlice";
import { LoginSlice } from "./slice/loginSlice";
import authReducer from './slice/authSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { BusinessSlice } from "./slice/businessSlice";



export const store = configureStore ({
reducer: {

    auth: authReducer,

    [LoginSlice.reducerPath]: LoginSlice.reducer,
    [UsersSlice.reducerPath]: UsersSlice.reducer,
    [WineriesSlice.reducerPath]: WineriesSlice.reducer,
    [CategoriesSlice.reducerPath]: CategoriesSlice.reducer,
    [UnitOfMeasurementSlice.reducerPath]: UnitOfMeasurementSlice.reducer,
    [ProductsSlice.reducerPath]: ProductsSlice.reducer,
    [BusinessSlice.reducerPath]: BusinessSlice.reducer,

},

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
LoginSlice.middleware,
UsersSlice.middleware,
WineriesSlice.middleware,
CategoriesSlice.middleware,
UnitOfMeasurementSlice.middleware,
ProductsSlice.middleware,
BusinessSlice.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Exporta los hooks tipados de Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();