import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../store/hooks";
import { useCosmWasmClient, useAccount } from "graz";
import { useEffect, useState } from "react";
import { CoreumDotFunQueryClient } from "../ts/CoreumDotFun.client";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { CHAIN_ID, COREUM_DOT_FUN_CONTRACT_ADDRESS } from "../constants";
import {
  setTicketHolders,
  setDraftState,
  setBonusRewards,
  setAccumulatedRewards,
  setDraftTVL,
  setDelegatedAmount,
  setNumberOfTicketsSold,
} from "../features/draft";
import {

  CurrentStateResponse,
  BonusRewardsResponse,
  AccumulatedRewardsResponse,
  DraftTvlResponse,
  DelegatedAmountResponse,
  TicketsSoldResponse,
  UserTicketsResponse,
  UserWinChanceResponse,
  TicketHoldersResponse,
  WinnerResponse,
  TotalBurnedResponse,
} from "../ts/CoreumDotFun.types";

export const useDraft = () => {
  const dispatch = useAppDispatch();
  const { data: coswasmClient } = useCosmWasmClient();
  const { data: account } = useAccount({chainId: CHAIN_ID});
  const [coreumDotFunClient, setCoreumDotFunClient] =
    useState<CoreumDotFunQueryClient | null>(null);

  useEffect(() => {
    const initializeCoreumDotFunClient = async () => {
      if (coswasmClient) {
        const coreumDotFunClient = new CoreumDotFunQueryClient(
          coswasmClient as unknown as CosmWasmClient,
          COREUM_DOT_FUN_CONTRACT_ADDRESS
        );
        setCoreumDotFunClient(coreumDotFunClient);
      }
    };
    initializeCoreumDotFunClient();
  }, [coswasmClient]);

  // Get Winner 
  const { data: winner, refetch: refetchWinner } = useQuery<WinnerResponse>({
    queryKey: ["winner"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getWinner();
        return result;
      }
      return { winner: "", rewards: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get number of tickets burned 
  const { data: numberOfTicketsBurned, refetch: refetchNumberOfTicketsBurned } = useQuery<TotalBurnedResponse>({
    queryKey: ["numberOfTicketsBurned"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getTotalTicketsBurned();
        return result;
      }
      return { total_burned: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });
  

  // Get participants
  const { data: ticketHolders, refetch: refetchTicketHolders } = useQuery<TicketHoldersResponse>({
    queryKey: ["ticketHolders"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getTicketHolders();
        dispatch(setTicketHolders(result));
        return result;
      }
      return { holders: [], total_holders: 0 };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get user tickets
  const { data: userTickets, refetch: refetchUserTickets } = useQuery<UserTicketsResponse>({
    queryKey: ["userTickets", account?.bech32Address],
    queryFn: async () => {
      if (coreumDotFunClient && account?.bech32Address) {
        return await coreumDotFunClient.getUserNumberOfTickets({
          address: account.bech32Address,
        });
      }
      return { address: "", tickets: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient && !!account?.bech32Address,
  });

  // Get user win chance
  const { data: userWinChance, refetch: refetchUserWinChance } = useQuery<UserWinChanceResponse>({
    queryKey: ["userWinChance", account?.bech32Address],
    queryFn: async () => {
      if (coreumDotFunClient && account?.bech32Address) {
        return await coreumDotFunClient.getUserWinChance({
          address: account.bech32Address,
        });
      }
      return { address: "", tickets: "0", win_chance: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient && !!account?.bech32Address,
  });

  // Get draft state
  const { data: draftState, refetch: refetchDraftState } = useQuery<CurrentStateResponse>({
    queryKey: ["draftState"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getCurrentState();
        dispatch(setDraftState(result));
        return result;
      }
      return { state: "TicketSalesOpen" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get bonus rewards
  const { data: bonusRewards, refetch: refetchBonusRewards } = useQuery<BonusRewardsResponse>({
    queryKey: ["bonusRewards"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getBonusRewards();
        dispatch(setBonusRewards(result));
        return result;
      }
      return { bonus_rewards: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get accumulated rewards
  const { data: accumulatedRewards, refetch: refetchAccumulatedRewards } = useQuery<AccumulatedRewardsResponse>({
    queryKey: ["accumulatedRewards"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getAccumulatedRewards();
        dispatch(setAccumulatedRewards(result));
        return result;
      }
      return { accumulated_rewards: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get draft TVL
  const { data: draftTVL, refetch: refetchDraftTVL } = useQuery<DraftTvlResponse>({
    queryKey: ["draftTVL"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getDraftTvl();
        dispatch(setDraftTVL(result));
        return result;
      }
      return { tvl: "0", denom: "ucore" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get delegated amount
  const { data: delegatedAmount, refetch: refetchDelegatedAmount } = useQuery<DelegatedAmountResponse>({
    queryKey: ["delegatedAmount"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getDelegatedAmount();
        dispatch(setDelegatedAmount(result));
        return result;
      }
      return { amount: { amount: "0", denom: "ucore" } };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Get number of tickets sold
  const { data: numberOfTicketsSold, refetch: refetchNumberOfTicketsSold } = useQuery<TicketsSoldResponse>({
    queryKey: ["numberOfTicketsSold"],
    queryFn: async () => {
      if (coreumDotFunClient) {
        const result = await coreumDotFunClient.getNumberOfTicketsSold();
        dispatch(setNumberOfTicketsSold(result));
        return result;
      }
      return { tickets_sold: "0", tickets_remaining: "0", total_tickets: "0" };
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!coreumDotFunClient,
  });

  // Function to refetch all data
  const refetchAll = async () => {
    await Promise.all([
      refetchTicketHolders(),
      refetchDraftState(),
      refetchBonusRewards(),
      refetchAccumulatedRewards(),
      refetchDraftTVL(),
      refetchDelegatedAmount(),
      refetchNumberOfTicketsSold(),
      refetchUserTickets(),
      refetchUserWinChance(),
    ]);
  };

  return {
    ticketHolders,
    draftState,
    bonusRewards,
    accumulatedRewards,
    draftTVL,
    delegatedAmount,
    numberOfTicketsSold,
    userTickets,
    userWinChance,
    winner,
    numberOfTicketsBurned,
    // Individual refetch functions
    refetchTicketHolders,
    refetchDraftState,
    refetchBonusRewards,
    refetchAccumulatedRewards,
    refetchDraftTVL,
    refetchDelegatedAmount,
    refetchNumberOfTicketsSold,
    refetchUserTickets,
    refetchUserWinChance,
    refetchWinner,
    refetchNumberOfTicketsBurned,
    // Refetch all data
    refetchAll,
  };
};
