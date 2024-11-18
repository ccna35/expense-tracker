import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "",
  email: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserInfo: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
      }>
    ) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserInfo, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
