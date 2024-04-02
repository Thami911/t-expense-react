import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(number) {
  let parts = number.toFixed(2).split('.');
  return (
    'R ' +
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

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((accumulator, item) => (accumulator += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((accumulator, item) => (accumulator += item), 0) *
    -1
  );

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
  <p className="money plus">{moneyFormatter(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
  <p className="money minus">{moneyFormatter(expense)}</p>
        </div>
      </div>
  )
}
