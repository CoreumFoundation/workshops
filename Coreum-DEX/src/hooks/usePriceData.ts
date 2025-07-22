import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceHistory, setLoading, setError, setCoreumPrice } from '../store/slices/priceSlice';
import { RootState } from '../store/store';

export const usePriceData = () => {
  const dispatch = useDispatch();
  const { priceHistory, isLoading, error, coreumPrice } = useSelector((state: RootState) => state.price);

  const fetchPriceData = async () => {
    try {
      dispatch(setLoading(true));
      const [ticketResponse, coreumResponse] = await Promise.all([
        fetch('/api/ticket_price'),
        fetch('https://get-token-price-be-production.up.railway.app/get-tokens-prices')
      ]);
      
      const ticketData = await ticketResponse.json();
      const coreumData = await coreumResponse.json();
      
      if (ticketData.priceHistory) {
        dispatch(setPriceHistory(ticketData.priceHistory));
      } else {
        dispatch(setError('No price history data available'));
      }

      // Find Coreum price from the response
      const coreumToken = coreumData.find((token: any) => token.name === 'COREUM');
      if (coreumToken) {
        dispatch(setCoreumPrice(coreumToken.price));
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch price data'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPriceData();
    // Refresh data every minute
    const interval = setInterval(fetchPriceData, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    priceHistory,
    isLoading,
    error,
    coreumPrice,
    refetch: fetchPriceData,
  };
}; 
