import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getCompliance } from './complianceAPI';

export interface AccountComplianceSummary {
  accountId: string;
  id: string;
  nickName: string;
  complianceSummary: ComplianceSummary
}

export interface ComplianceSummary {
  ruleCompliance: Summary
  resourceCompliance: Summary
}
export interface Summary {
  compliantResources: number;
  compliantExceeded: boolean;
  nonComplianceResources: number;
  nonComplianceExeeded: boolean;
}

export interface ComplianceState {
  accountsCompliances: AccountComplianceSummary[] | undefined
}

const initialState: ComplianceState = {
  accountsCompliances: undefined
};

export const fetchCompliance = createAsyncThunk(
  'compliance/fetch',
  async () => {
    const compliances: AccountComplianceSummary[] = await getCompliance()
    // const response = await getCosts(orgId);

    // The value we return becomes the `fulfilled` action payload
    return compliances;
  }
);
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCompliance = (state: RootState) => state.compliance.accountsCompliances;


export const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompliance.fulfilled, (state, action) => {
        state.accountsCompliances = action.payload;
      });
  },

});


export default complianceSlice.reducer;