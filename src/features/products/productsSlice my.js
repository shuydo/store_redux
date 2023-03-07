import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shuffle } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";

export const getProducts = createAsyncThunk(
  "products/getCategories",
  async (_, thunkAPi) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPi.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(
        ({ category: { id } }) => id === payload.id
      );
      state.related = shuffle(list);
    },
  },

  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });

    builder.addCase(getProducts.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;