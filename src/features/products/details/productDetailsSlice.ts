import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Component } from '../../component/componentSlice';
import { getComponents } from './productAPI';
// import { fetchCount } from './counterAPI';


export interface ProductDetailsState {
  components: Component[];
}

interface GetProductComponentsThunkArgs {
  productName: string;
}
const initialState: ProductDetailsState = {
  components: [],
};

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async ({ productName }: GetProductComponentsThunkArgs) => {

    return await getComponents(productName)
  }
);
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectComponents = (state: RootState) => state.productDetails.components;


export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.components = action.payload;
    });
  },
});

export default productDetailsSlice.reducer;
