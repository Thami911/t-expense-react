import React, {useContext} from 'react';
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

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}{moneyFormatter(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
  )
}
