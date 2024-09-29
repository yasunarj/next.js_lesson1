import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./autoSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuth.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;