import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { getCostDetails } from './costDetailAPI';

export interface CostDetails {
  resourceCosts: ResourceCost[]
  costOverTime: MonthCost[]
}

interface MonthCost {
  price: string;
  month: string;
}
interface ResourceCost {
  price: string;
  resourceType: string;
}

export interface CostDetailState {
  costDetails: CostDetails | undefined
}

interface GetCostDetailsThunkArgs {
  accountId: string
}

const initialState: CostDetailState = {
  costDetails: undefined,
};

export const fetchCostDetails = createAsyncThunk(
  'costs/details/fetch',
  async ({ accountId }: GetCostDetailsThunkArgs) => {
    // return await getRuleDetails(name, accountId)
    return await getCostDetails(accountId)
  }

);

export const selectCostDetailsStatus = (state: RootState) => state.costDetails.costDetails

export const costDetailSlice = createSlice({
  name: 'cost/details',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostDetails.fulfilled, (state, action) => {
        state.costDetails = action.payload;
      })
  },

});


export default costDetailSlice.reducer;
