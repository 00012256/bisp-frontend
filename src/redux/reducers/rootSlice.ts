import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../interfaces/User";

interface RootState {
  loading: boolean;
  userInfo: User | null;
}

const initialState: RootState = {
  loading: true,
  userInfo: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLoading, setUserInfo } = rootSlice.actions;
export default rootSlice.reducer;
