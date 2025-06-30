import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setupServer } from "../../fakeApis";

const initialState = {
  loading: false,
  error: false,
  clothData: [],
  clothDataHomepage: {},
  shoeData: [],
};
setupServer()
export const getClothData = createAsyncThunk("home/getClothData", async () => {
  console.log("Fetching cloth data from API");
  let res = await fetch("/api/getfourproducts");
  const data1 = await res.json();
  const data = data1[0];
  console.log("Cloth data fetched successfully", data);
  const flatArray = [...data.a, ...data.b, ...data.c];
  return { data: flatArray, clothDataHomepage: data };
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // add other actions here which are not createAsyncThunk
  },
  extraReducers: (builder) => {
    builder.addCase(getClothData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClothData.fulfilled, (state, action) => {
      state.clothData = action.payload.data;
      state.clothDataHomepage = action.payload.clothDataHomepage;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getClothData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
