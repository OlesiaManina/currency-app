import React, { useState, useEffect } from 'react';
import fetchRates from '../services/currency-api';

const CurrencyConverter: React.FC = () => {
  const [usdAmount, setUsdAmount] = useState<number>(1);
  const [selectedCurrency1, setSelectedCurrency1] = useState<string>('USD');
  const [amount1, setAmount1] = useState<number>(1);
  const [selectedCurrency2, setSelectedCurrency2] = useState<string>('EUR');
  const [amount2, setAmount2] = useState<number>(1);
  const [eurRate, setEurRate] = useState<number | null>(1);
  const [uahRate, setUahRate] = useState<number | null>(1);

  useEffect(() => {
    async function fetchRatesData() {
      try {
        const rates = await fetchRates();
        const preparedEur = (rates.EUR / rates.USD).toFixed(2);
        setEurRate(Number(preparedEur));
        const preparedUah = (rates.UAH / rates.USD).toFixed(2)
        setUahRate(Number(preparedUah));
      } catch (error) {
        console.error(error);
      }
    }

    fetchRatesData();
  }, []);

  useEffect(() => {
    setAmount1(usdAmount * (selectedCurrency1 === 'USD' ? 
    1 : (selectedCurrency1 === 'EUR' ? eurRate! : uahRate!)));
    setAmount2(usdAmount * (selectedCurrency2 === 'USD' ? 
    1 : (selectedCurrency2 === 'EUR' ? eurRate! : uahRate!)));
  }, [usdAmount, selectedCurrency1, selectedCurrency2, eurRate, uahRate]);

  const handleCurrency1Change = (currency: string) => {
    setSelectedCurrency1(currency);
  };

  const handleCurrency2Change = (currency: string) => {
    setSelectedCurrency2(currency);
  };

  const handleAmount1Change = (value: number) => {
    setUsdAmount(value);
  };

  const handleAmount2Change = (value: number) => {
    setUsdAmount(value / (selectedCurrency2 === 'USD' ? 
    1 : (selectedCurrency2 === 'EUR' ? eurRate! : uahRate!)));
  };

  return (
    <main>
      <h2>Currency Converter</h2>
      <label >
        Currency 1:
        <select value={selectedCurrency1} 
        onChange={(e) => handleCurrency1Change(e.target.value)}
        style={{ marginLeft: 5, marginRight: 5}}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={amount1.toFixed(2)} 
        onChange={(e) => handleAmount1Change(Number(e.target.value))} 
        style={{ marginBottom: 5}}/>
      </label>
      <br />
      <label>
        Currency 2:
        <select value={selectedCurrency2} 
        onChange={(e) => handleCurrency2Change(e.target.value)}
        style={{ marginLeft: 5, marginRight: 5}}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={amount2.toFixed(2)} 
        onChange={(e) => handleAmount2Change(Number(e.target.value))} />
      </label>
    </main>
  );
};

export default CurrencyConverter;
