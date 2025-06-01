import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chainName } from '../../config/default';

//Base token is the token the user is buying or selling.
// Quote token is the token used to price the base token. It's the currency used to buy or sell the base token.
// See Concept Of 


export interface GeneralState {
  network: string;
  account: string;
  isConnected: boolean;
  isTxExecuting: boolean;
  isConnectModalOpen: boolean;
  isManageCurrencyModalOpen: boolean;
  isDisclaimerModalOpen: boolean;
  isBuyTicketModalOpen: boolean;
  isBurnTicketModalOpen: boolean;
}

export const initialGeneralState: GeneralState = {
  network: chainName,
  account: '',
  isConnected: false,
  isTxExecuting: false,
  isConnectModalOpen: false,
  isManageCurrencyModalOpen: false,
  isDisclaimerModalOpen: true,
  isBuyTicketModalOpen: false,
  isBurnTicketModalOpen: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setIsConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.isConnectModalOpen = action.payload;
    },

    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload;
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
 
    setIsTxExecuting(state, action: PayloadAction<boolean>) {
      state.isTxExecuting = action.payload;
    },
    setIsManageCurrencyModalOpen(state, action: PayloadAction<boolean>) {
      state.isManageCurrencyModalOpen = action.payload;
    },
    setIsBuyTicketModalOpen(state, action: PayloadAction<boolean>) {
      state.isBuyTicketModalOpen = action.payload;
    },
    setIsBurnTicketModalOpen(state, action: PayloadAction<boolean>) {
      state.isBurnTicketModalOpen = action.payload;
    },
  },
});

export const {
  setIsConnectModalOpen,
  setAccount,
  setIsConnected,
  setIsTxExecuting,
  setIsManageCurrencyModalOpen,
  setIsBuyTicketModalOpen,
  setIsBurnTicketModalOpen,
} = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export default generalSlice.reducer;
