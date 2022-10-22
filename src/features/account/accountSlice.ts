import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addAccount, getAccountMetaData, getAccounts, updateAccount } from './accountAPI';

export interface Account {
  id: string;
  accountId: string;
  name: string;
  roleArn?: string;
  hostedZoneId?: string;
  externalId?: string;
  trackCost: boolean;
  trackCompliance: boolean;
  regions: Region[]
}

export interface Region {
  id: string;
  region: string;

}

export interface AccountsState {
  accounts: Account[];
  isLoading: boolean;
  metaData: any;
}

interface AddAccountThunkArgs {
  account: Account;
}

interface GetAccountMetaDataThunkArgs {
  productName: string;
}

interface AddAccountThunkArgs {
  account: Account;
}

interface UpdateAccountThunkArgs {
  account: Account;
}

const initialState: AccountsState = {
  accounts: [],
  isLoading: false,
  metaData: undefined
};

export const createAccount = createAsyncThunk(
  'accounts/addAccount',
  async ({ account }: AddAccountThunkArgs) => {
    return addAccount(account);
  }
);

export const editAccount = createAsyncThunk(
  'accounts/updateAccount',
  async ({ account }: UpdateAccountThunkArgs) => {
    return updateAccount(account);
  }
);

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async () => {
    const response = await getAccounts();

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchAccountMetaData = createAsyncThunk(
  'accounts/fetchAccountMetaData',
  async ({productName}: GetAccountMetaDataThunkArgs) => {

    return await getAccountMetaData(productName)
  }
);
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAccountState = (state: RootState) => state.accounts.accounts;
export const selectAccountIsLoading = (state: RootState) => state.accounts.isLoading;
export const selectAccountMetaData = (state: RootState) => state.accounts.metaData;

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.isLoading = false
      })
      .addCase(fetchAccounts.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.accounts = [];
        state.isLoading = false
      })
      .addCase(fetchAccountMetaData.fulfilled, (state, action) => {
        state.metaData = action.payload;
      });
  },
});

export default accountsSlice.reducer;
