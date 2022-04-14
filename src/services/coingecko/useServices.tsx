import { useEffect, useState } from "react";

export function useFetchPairPrice(coin: string, currency: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
  
    async function execute() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
        );
        const responseJSON = await response.json();
        setData(responseJSON);
        setLoading(false);
        setError(null);
      } catch (error: any) {
        console.error("getting price failed", error);
        setData(null);
        setLoading(false);
        setError("error in getting price");
      }
    }
  
    useEffect(() => {
      if (data) return;
      execute();
    }, []);
  
    return {
      data,
      loading,
      error,
      execute,
    };
  }