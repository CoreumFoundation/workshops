import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ParticipantsResponse,
  CurrentStateResponse,
  BonusRewardsResponse,
  AccumulatedRewardsResponse,
  DraftTvlResponse,
  DelegatedAmountResponse,
  TicketsSoldResponse,
  DrawState,
  Coin,
  TicketHoldersResponse,
} from "../../ts/CoreumDotFun.types";

interface DraftState {
  ticketHolders: TicketHoldersResponse;
  draftState: CurrentStateResponse;
  bonusRewards: BonusRewardsResponse;
  accumulatedRewards: AccumulatedRewardsResponse;
  draftTVL: DraftTvlResponse;
  delegatedAmount: DelegatedAmountResponse;
  numberOfTicketsSold: TicketsSoldResponse;
}

const initialState: DraftState = {
  ticketHolders: { holders: [], total_holders: 0 },
  draftState: { state: "TicketSalesOpen" as DrawState },
  bonusRewards: { bonus_rewards: "0" },
  accumulatedRewards: { accumulated_rewards: "0" },
  draftTVL: { tvl: "0", denom: "ucore" },
  delegatedAmount: { amount: { amount: "0", denom: "ucore" } },
  numberOfTicketsSold: { tickets_sold: "0", tickets_remaining: "0", total_tickets: "0" },
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setTicketHolders: (state, action: PayloadAction<TicketHoldersResponse>) => {
      state.ticketHolders = action.payload;
    },
    setDraftState: (state, action: PayloadAction<CurrentStateResponse>) => {
      state.draftState = action.payload;
    },
    setBonusRewards: (state, action: PayloadAction<BonusRewardsResponse>) => {
      state.bonusRewards = action.payload;
    },
    setAccumulatedRewards: (state, action: PayloadAction<AccumulatedRewardsResponse>) => {
      state.accumulatedRewards = action.payload;
    },
    setDraftTVL: (state, action: PayloadAction<DraftTvlResponse>) => {
      state.draftTVL = action.payload;
    },
    setDelegatedAmount: (state, action: PayloadAction<DelegatedAmountResponse>) => {
      state.delegatedAmount = action.payload;
    },
    setNumberOfTicketsSold: (state, action: PayloadAction<TicketsSoldResponse>) => {
      state.numberOfTicketsSold = action.payload;
    },
  },
});

export const {
  setTicketHolders,
  setDraftState,
  setBonusRewards,
  setAccumulatedRewards,
  setDraftTVL,
  setDelegatedAmount,
  setNumberOfTicketsSold,
} = draftSlice.actions;

export default draftSlice.reducer;
