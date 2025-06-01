import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TokenPair } from '../../shared/types';
import { COREUM_TOKEN_TESTNET, TICKET_TOKEN_TESTNET } from '../../constants';
import { Order } from "coreum-js-nightly/dist/main/coreum/dex/v1/order";
import { getOpenOrders, getOrderHistory } from './queries';
import type { Client } from 'coreum-js-nightly';

export interface DexState {
  tokenPair: TokenPair;
  openOrders: Order[];
  orderHistory: Order[];
  baseAmount: string;
  quoteAmount: string;
  isLoading: boolean;
  error: string | null;
  selectedOrder: Order | null;
}

export const initialDexState: DexState = {
  tokenPair: {
    base: {
      symbol: TICKET_TOKEN_TESTNET.symbol,
      denom: TICKET_TOKEN_TESTNET.denom,
      logo: TICKET_TOKEN_TESTNET.logo
    },
    quote: {
      symbol: COREUM_TOKEN_TESTNET.symbol,
      denom: COREUM_TOKEN_TESTNET.denom,
      logo: COREUM_TOKEN_TESTNET.logo
    }
  },
  openOrders: [],
  orderHistory: [],
  baseAmount: '0',
  quoteAmount: '0',
  isLoading: false,
  error: null,
  selectedOrder: null
};

// Async thunks for fetching orders
export const fetchOpenOrders = createAsyncThunk(
  'dex/fetchOpenOrders',
  async ({ queryClient, address }: { queryClient: Client; address?: string }, { getState }) => {
    const state = getState() as { dex: DexState };
    const { base, quote } = state.dex.tokenPair;
    return await getOpenOrders(queryClient, base.denom, quote.denom, address);
  }
);

export const fetchOrderHistory = createAsyncThunk(
  'dex/fetchOrderHistory',
  async ({ queryClient, address }: { queryClient: Client; address?: string }, { getState }) => {
    const state = getState() as { dex: DexState };
    const { base, quote } = state.dex.tokenPair;
    return await getOrderHistory(queryClient, base.denom, quote.denom, address);
  }
);

const dexSlice = createSlice({
  name: 'dex',
  initialState: initialDexState,
  reducers: {
    setTokenPair(state, action: PayloadAction<TokenPair>) {
      state.tokenPair = action.payload;
    },
    swapTokenPair(state) {
      const { base, quote } = state.tokenPair;
      state.tokenPair = {
        base: quote,
        quote: base
      };
    },
    setSelectedOrder(state, action: PayloadAction<Order | null>) {
      state.selectedOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle open orders
      .addCase(fetchOpenOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOpenOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.openOrders = action.payload;
      })
      .addCase(fetchOpenOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch open orders';
      })
      // Handle order history
      .addCase(fetchOrderHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch order history';
      });
  },
});

export const {
  setTokenPair,
  swapTokenPair,
  setSelectedOrder,
} = dexSlice.actions;
export const dexReducer = dexSlice.reducer;
export default dexSlice.reducer;
