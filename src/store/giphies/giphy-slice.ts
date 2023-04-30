import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TGiphy } from "../../types/types";
import { getGiphies } from "./reducer";

export type TGiphiesState = {
  loading: boolean;
  data: TGiphy[];
  meta: null | {
    msg: string;
    response_id: string;
    status: number;
  };
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  error: any;
};

const initialState: TGiphiesState = {
  loading: false,
  data: [],
  meta: null,
  pagination: {
    count: 50,
    offset: 0,
    total_count: 0,
  },
  error: {
    message: "",
  },
};

export const giphySlice = createSlice({
  name: "giphy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGiphies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGiphies.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload.data.data;
        state.meta = action.payload.data.meta;
        state.pagination = action.payload.data.pagination;
        state.loading = false;
      })
      .addCase(getGiphies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = giphySlice.actions;

export default giphySlice.reducer;
