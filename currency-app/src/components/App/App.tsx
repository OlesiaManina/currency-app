import React from 'react';
import CurrencyConverter from '../CurrencyConverter';
import CurrencyHeader from '../CurrencyHeader';
import style from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={style.container}>
      <CurrencyHeader />
      <CurrencyConverter />
    </div>
  );
};

export default App;