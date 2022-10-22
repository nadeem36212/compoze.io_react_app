import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import costReducer from '../features/costs/costSlice';
import authReducer from '../features/auth/authSlice'
import accountsReducer from '../features/account/accountSlice'
import organizationReducer from '../features/organization/organizationSlice'
import complianceReducer from '../features/compliance/compliantSlice'
import complianceDetailReducer from '../features/complianceDetails/compliantDetailsSlice'
import productsReducer from '../features/products/productSlice';
import templateReducer from '../features/templates/templateSlice';
import componentReducer from '../features/component/componentSlice';
import productDetailsReducer from '../features/products/details/productDetailsSlice';
import ruleReducer from '../features/rule/ruleDetailsSlice';
import costDetailReducer from '../features/costs/costDetails/costDetailsSlice';
import alertReducer from "../features/alertSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    alerts: alertReducer,
    rule: ruleReducer,
    cost: costReducer,
    costDetails: costDetailReducer,
    products: productsReducer,
    templates: templateReducer,
    component: componentReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    accounts: accountsReducer,
    organization: organizationReducer,
    compliance: complianceReducer,
    complianceDetails: complianceDetailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
