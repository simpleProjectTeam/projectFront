import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({
  transactions,
  editingIndex,
  editedTransaction,
  setEditedTransaction,
  handleEditTransaction,
  deleteTransaction,
  editTransaction,
  formatCurrency,
  formatDate,
}) => {
  return (
    <div>
      <h2>거래 내역</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            transaction={transaction}
            index={index}
            editingIndex={editingIndex}
            editedTransaction={editedTransaction}
            setEditedTransaction={setEditedTransaction}
            handleEditTransaction={handleEditTransaction}
            deleteTransaction={deleteTransaction}
            editTransaction={editTransaction}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
