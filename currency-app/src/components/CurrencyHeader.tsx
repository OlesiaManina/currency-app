import React, { useState, useEffect } from 'react';
import fetchRates from '../services/currency-api';

const CurrencyHeader: React.FC = () => {
  const [eurRate, setEurRate] = useState<number | null>(null);
  const [usdRate, setUsdRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRatesData() {
      try {
        const rates = await fetchRates();
        setUsdRate(rates.UAH);
        setEurRate(rates.UAH / rates.EUR);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRatesData();
  }, []);


  return (
    <header>
      <h2>Exchange Rates</h2>
      {usdRate !== null && <p>1 USD = {usdRate.toFixed(2)} UAH</p>}
      {eurRate !== null && <p>1 EUR = {eurRate.toFixed(2)} UAH</p>}
    </header>
  );
};

export default CurrencyHeader;