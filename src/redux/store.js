import { configureStore } from "@reduxjs/toolkit";
// import slisers
import newsRedusers from "./newsRedusers";

export const store = configureStore({
  // import redusers
  reducer: {
    news: newsRedusers,
  },
});
