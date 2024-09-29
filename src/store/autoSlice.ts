import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isAuth: boolean;
}

const initialState: InitialState = {
  isAuth: false
}

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    }
  }
});

export const { login, logout } = userAuth.actions;
export default userAuth;

