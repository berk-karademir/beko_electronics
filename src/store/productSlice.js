import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllElectronicsProducts, fetchProductDetail, fetchCategoryProducts } from '../services/api';

const initialState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null,
};

export const fetchAllElectronics = createAsyncThunk(
  'products/fetchAllElectronics',
  async (categories) => {
    return await fetchAllElectronicsProducts(categories);
  }
);

export const fetchProductDetailThunk = createAsyncThunk(
  'products/fetchProductDetail',
  async (id) => {
    return await fetchProductDetail(id);
  }
);

export const fetchCategoryProductsThunk = createAsyncThunk(
  'products/fetchCategoryProducts',
  async (category) => {
    return await fetchCategoryProducts(category);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllElectronics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllElectronics.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllElectronics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCategoryProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
