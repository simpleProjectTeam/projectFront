import React from 'react';

const TransactionItem = ({
  transaction,
  index,
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
    <li key={index}>
      <div className="date">{formatDate(transaction.date)}</div>
      <div className="description">{transaction.description}</div>
      <div className={`amount ${transaction.amount < 0 ? 'expense' : ''}`}>
        {transaction.amount > 0 ? '+' : ''}
        {formatCurrency(transaction.amount)}원
      </div>
      <div className="buttons">
        {editingIndex === index ? (
          <div className="edit-form">
            <label>
              설명:
              <input
                type="text"
                value={editedTransaction.description}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, description: e.target.value })}
              />
            </label>
            <label>
              금액:
              <input
                type="text"
                value={editedTransaction.amount}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, amount: e.target.value })}
              />
            </label>
            <label>
              날짜 (YYYYMMDD):
              <input
                type="text"
                value={editedTransaction.date}
                onChange={(e) => setEditedTransaction({ ...editedTransaction, date: e.target.value })}
              />
            </label>
            <button className="edit" onClick={() => handleEditTransaction(index)}>
              수정 완료
            </button>
          </div>
        ) : (
          <div>
            <button className="delete" onClick={() => deleteTransaction(index)}>
              삭제
            </button>
            <button className="edit" onClick={() => editTransaction(index)}>
              수정
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TransactionItem;
