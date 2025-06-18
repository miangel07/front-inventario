import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./slice/usersSlice";
import { WineriesSlice } from "./slice/wineriesSlice";
import { CategoriesSlice } from "./slice/categoriesSlice";


export const store = configureStore ({
reducer: {
    [UsersSlice.reducerPath]: UsersSlice.reducer,
    [WineriesSlice.reducerPath]: WineriesSlice.reducer,
    [CategoriesSlice.reducerPath]: CategoriesSlice.reducer,

},

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
UsersSlice.middleware,
WineriesSlice.middleware,
CategoriesSlice.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;