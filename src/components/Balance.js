import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(number) {
  let parts = number.toFixed(2).split('.');
  return (
    'R ' + (parts[0].split('')[0]=== '-' ? '-' : '') +
    parts[0]
      .split('')
      .reverse()
      .reduce(function (accumulator, number, index, originalArray) {
        return number === '-' ? accumulator : number + (index && !(index % 3) ? ',' : '') + accumulator;
      }, '') +
    '.' +
    parts[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((accumulator, item) => (accumulator += item), 0);

  return (
    <>
      <h4>Your Balance</h4>
    <h1>{moneyFormatter(total)}</h1>
    </>
  )
}
