import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootSlice";

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
