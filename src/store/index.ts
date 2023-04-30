import { configureStore } from "@reduxjs/toolkit";
import giphyReducer from "./giphies/giphy-slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    giphy: giphyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const { dispatch } = store;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export { store, dispatch };
