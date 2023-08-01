import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import { userApiSlice } from "./api/userApiSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        [api.reducerPath]: api.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
