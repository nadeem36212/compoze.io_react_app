import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createProduct, getProducts } from './productAPI';
// import { fetchCount } from './counterAPI';

export interface ProductInformation {
  id: string;
  accountId: string;
  name: string;
  region: string;
  // environments: string;
  totalCost: string;
  forecastedAmount: string;
  complianceIssues: string;
}

export interface ProductState {
  products: ProductInformation[];
}

interface GetProductsThunkArgs {
  orgId: string;
}
interface CreateProductThunkArgs {
  name: string;
  accountId: string;
  githubOrganization?: string;
  region: string;
  environments: string[];
  createVpc: boolean;
}
const initialState: ProductState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ orgId }: GetProductsThunkArgs) => {

    return await getProducts()
  }
);

export const createNewProduct = createAsyncThunk(
  'products/createProduct',
  async ({ name, accountId, githubOrganization, region, environments, createVpc }: CreateProductThunkArgs) => {

    return await createProduct(name, accountId, region, environments, createVpc, githubOrganization)

  }
);
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state: RootState) => state.products.products;

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
  },
});

export default productsSlice.reducer;
