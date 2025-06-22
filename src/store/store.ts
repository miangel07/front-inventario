import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./slice/usersSlice";
import { WineriesSlice } from "./slice/wineriesSlice";
import { CategoriesSlice } from "./slice/categoriesSlice";
import { UnitOfMeasurementSlice } from "./slice/unitOfMeasurementSlice";



export const store = configureStore ({
reducer: {
    [UsersSlice.reducerPath]: UsersSlice.reducer,
    [WineriesSlice.reducerPath]: WineriesSlice.reducer,
    [CategoriesSlice.reducerPath]: CategoriesSlice.reducer,
    [UnitOfMeasurementSlice.reducerPath]: UnitOfMeasurementSlice.reducer,

},

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
UsersSlice.middleware,
WineriesSlice.middleware,
CategoriesSlice.middleware,
UnitOfMeasurementSlice.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;