import React from 'react';

const TotalBalance = ({ transactions }) => {
  const totalBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'REVENUE') {
      return acc + transaction.amount;
    } else if (transaction.type === 'EXPENSE') {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);

  return (
    <div>
      <h2>Solde total : {totalBalance}</h2>
    </div>
  );
};

export default TotalBalance;
