import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponse, TPagination } from "./types";
import axios from "axios";
const api_key = "c5kTQiIHLOx3hWgrKB8n1HGj5fSZoXNS";

export const getGiphies = createAsyncThunk(
  "giphy/get_giphies",
  async (data: TPagination & { q: string }, { rejectWithValue }) => {
    try {
      return await axios.get<IResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${
          data.q
        }&offset=${data.offset || 0}&limit=${data.count || 0}`
      );
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
