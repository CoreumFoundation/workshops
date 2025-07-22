import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TicketHolder {
  address: string;
  balance: {
    denom: string;
    amount: string;
  };
}

interface TicketsState {
  holders: TicketHolder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  holders: [],
  isLoading: false,
  error: null,
};

export const fetchTicketHolders = createAsyncThunk(
  'tickets/fetchHolders',
  async (ticketDenom: string) => {
    try {
      const response = await axios.get(
        `https://coreum-api.ibs.team/cosmos/bank/v1beta1/denom_owners/${ticketDenom}`
      );
      return response.data.denom_owners;
    } catch (error) {
      throw error;
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketHolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTicketHolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holders = action.payload;
      })
      .addCase(fetchTicketHolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch ticket holders';
      });
  },
});

export default ticketsSlice.reducer; 
