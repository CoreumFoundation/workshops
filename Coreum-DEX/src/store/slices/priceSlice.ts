import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceData {
  time: string;
  value: number;
}

interface TokenPrice {
  name: string;
  currency: string;
  denom: string;
  price: number;
}

interface PriceState {
  priceHistory: PriceData[];
  isLoading: boolean;
  error: string | null;
  coreumPrice: number | null;
}

const initialState: PriceState = {
  priceHistory: [],
  isLoading: false,
  error: null,
  coreumPrice: null,
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPriceHistory: (state, action: PayloadAction<PriceData[]>) => {
      state.priceHistory = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setCoreumPrice: (state, action: PayloadAction<number>) => {
      state.coreumPrice = action.payload;
    },
  },
});

export const { setPriceHistory, setLoading, setError, setCoreumPrice } = priceSlice.actions;
export default priceSlice.reducer; 
