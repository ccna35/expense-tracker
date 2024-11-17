import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface UserState {
  name: string;
  email: string;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "",
  email: "",
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
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
