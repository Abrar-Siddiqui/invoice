import { configureStore } from "@reduxjs/toolkit";
import { mydata } from "./Slices/GetDataSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [mydata.reducerPath]: mydata.reducer,
  },
  middleware: (data) => data().concat(mydata.middleware),
});
setupListeners(store.dispatch);
