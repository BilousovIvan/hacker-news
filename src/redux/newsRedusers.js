import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const newsRedusers = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadNews: (state, action) => {
      const count = action.payload;
      let arr = [];
      console.log("ПРобуем...");
    },
  },
});

const uploadingNews = (count) => {
  let arr = [];
};

export const { loadNews } = newsRedusers.actions;
export default newsRedusers.reducer;
