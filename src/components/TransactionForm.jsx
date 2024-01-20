import React from 'react';

const TransactionForm = ({
  newTransaction,
  setNewTransaction,
  handleTransaction,
  isNumberOrNegative,
  isValidDate,
}) => {
  return (
    <div>
      <label>
        설명:
        <input
          type="text"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        />
      </label>
      <label>
        금액:
        <input
          type="text"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        />
      </label>
      <label>
        날짜 (YYYYMMDD):
        <input
          type="text"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
        />
      </label>
      <button className="income" onClick={() => handleTransaction('income')}>
        수입
      </button>
      <button className="expense" onClick={() => handleTransaction('expense')}>
        지출
      </button>
    </div>
  );
};

export default TransactionForm;
