import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./slice/usersSlice";


export const store = configureStore ({
reducer: {
    [UsersSlice.reducerPath]: UsersSlice.reducer,

},

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
UsersSlice.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;