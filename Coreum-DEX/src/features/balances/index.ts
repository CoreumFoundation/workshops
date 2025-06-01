import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin } from "@cosmjs/amino";
import {  Token } from '../../shared/types';
import axios, { AxiosResponse } from 'axios';
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from '../../constants';
import { convertSubunitToUnit, convertUnitToSubunit } from '../../utils/convertUnitToSubunit';

interface FetchBalancesByAccountArgs {
  account: string;
}

export const fetchBalancesByAccount = createAsyncThunk(
  'balances/fetchByAccount',
  async ({ account }: FetchBalancesByAccountArgs, thunkAPI) => {
    const state = thunkAPI.getState();
    const currencies = [COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET];

    let balancesToSet = [];
    try {
      const balancesRequestUrl = `https://coreum-api.ibs.team/cosmos/bank/v1beta1/balances/${account}`;
      const {
        data: {
          pagination: { total: balancesTotal },
          balances,
        },
      }: AxiosResponse<{ pagination: { total: string }; balances: Coin[]; }> = await axios.get(balancesRequestUrl);

      balancesToSet = balances;

      if (Number(balancesTotal) > balances.length) {
        const {
          data: {
            balances: allBalances,
          }
        }: AxiosResponse<{ balances: Coin[] }> = await axios.get(`${balancesRequestUrl}&pagination.limit=${balancesTotal}`);

        balancesToSet = allBalances;
      }

      const userPairBalances: any[] = [];
      const userOtherBalances: Coin[] = [];

      balances.forEach((token: Coin) => {
        const isPair = currencies.find((currency: Token) => currency.denom === token.denom);

        if (isPair) {
          userPairBalances.push({
            ...isPair,
            amount: token.amount,
          });
        } else {
          userOtherBalances.push(token);
        }
      });

      thunkAPI.dispatch(setBalances(userPairBalances));

      return balancesToSet;
    } catch (error) {
      return [];
    }
  },
);

export interface BalancesState {
  list: Token[];
  shouldRefetch: boolean;
  isLoading: boolean;
  restBalances: any[];
  isFetched: boolean;
}

export const initialBalancesState: BalancesState = {
  isLoading: false,
  list: [],
  shouldRefetch: false,
  restBalances: [],
  isFetched: false,
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState: initialBalancesState,
  reducers: {
    setBalances(state, action: PayloadAction<Token[]>) {
      state.list = action.payload;
    },
    shouldRefetchBalances(state, action: PayloadAction<boolean>) {
      state.shouldRefetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalancesByAccount.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchBalancesByAccount.rejected, (state, action) => {
      state.restBalances = action.payload as any[];
      state.isLoading = false;
      state.isFetched = true;
    })
    builder.addCase(fetchBalancesByAccount.fulfilled, (state, action) => {
      state.restBalances = action.payload;
      state.isLoading = false;
      state.isFetched = true;
    })
  },
});

export const { setBalances, shouldRefetchBalances } = balancesSlice.actions;

// Selectors
export const selectBalances = (state: { balances: BalancesState }) => state.balances.list;
export const selectBalanceByDenom = (denom: string) => (state: { balances: BalancesState }) => 
  state.balances.list.find(b => b.denom === denom)?.amount || '0';
export const selectTokenByDenom = (denom: string) => (state: { balances: BalancesState }) => 
  state.balances.list.find(b => b.denom === denom);
export const selectFormattedBalanceByDenom = (denom: string) => (state: { balances: BalancesState }) => {
  const token = state.balances.list.find(b => b.denom === denom);
  if (!token?.amount) return '0';
  
  
  const amount = token.amount;

  const precision = token.denom === COREUM_TOKEN_TESTNET.denom 
        ? COREUM_TOKEN_TESTNET.precision 
        : TICKET_TOKEN_TESTNET.precision;
 
  // Convert to decimal
  const formattedAmount = convertSubunitToUnit({ amount, precision: precision as number });
  
  return formattedAmount;
};

export const selectPrecisionByDenom = (denom: string) => (state: { balances: BalancesState }) => {
  const token = state.balances.list.find(b => b.denom === denom);
  return token?.precision;
};
export const selectIsLoading = (state: { balances: BalancesState }) => state.balances.isLoading;
export const selectIsFetched = (state: { balances: BalancesState }) => state.balances.isFetched;
export const selectRestBalances = (state: { balances: BalancesState }) => state.balances.restBalances;

export const balancesReducer = balancesSlice.reducer;
export default balancesSlice.reducer;
