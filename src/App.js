import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'income',
    date: '',
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTransaction, setEditedTransaction] = useState({
    description: '',
    amount: '',
    type: 'income',
    date: '',
  });

  const isNumberOrNegative = (value) => {
    return /^-?\d+$/.test(value);
  };

  const handleTransaction = (type) => {
    if (isNumberOrNegative(newTransaction.amount) && isValidDate(newTransaction.date)) {
      const signedAmount = type === 'income' ? parseInt(newTransaction.amount, 10) : -parseInt(newTransaction.amount, 10);
      setTransactions([...transactions, { ...newTransaction, amount: signedAmount }]);
      setNewTransaction({ description: '', amount: '', type: 'income', date: '' });
    } else {
      alert('유효한 숫자 또는 음수를 입력하고, 올바른 날짜 형식(YYYYMMDD)으로 입력하세요.');
    }
  };

  const handleEditTransaction = (index) => {
    if (isNumberOrNegative(editedTransaction.amount) && isValidDate(editedTransaction.date)) {
      const editedTransactions = [...transactions];
      const signedAmount = editedTransaction.type === 'income' ? parseInt(editedTransaction.amount, 10) : -parseInt(editedTransaction.amount, 10);
      editedTransactions[index] = { ...editedTransaction, amount: signedAmount };
      setTransactions(editedTransactions);
      setEditedTransaction({ description: '', amount: '', type: 'income', date: '' });
      setEditingIndex(-1);
    } else {
      alert('유효한 숫자 또는 음수를 입력하고, 올바른 날짜 형식(YYYYMMDD)으로 입력하세요.');
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{8}$/;
    return regex.test(dateString);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const editTransaction = (index) => {
    setEditedTransaction(transactions[index]);
    setEditingIndex(index);
  };

  const calculateTotal = (type) => {
    return transactions
      .filter((transaction) => (type === 'income' ? transaction.amount > 0 : transaction.amount < 0))
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');
  const totalAssets = totalIncome - totalExpense;

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US');
  };

  const formatDate = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="App">
      <h1>개인수입지출내역</h1>
      <div>
        <div>
          <h2 className="total">총 자산: {formatCurrency(totalAssets)}원</h2>
          <span className="total">총 수입: {formatCurrency(totalIncome)}원</span>
          <span className="total">총 지출: {formatCurrency(totalExpense)}원</span>
        </div>
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
      <div>
        <h2>거래 내역</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <div className="date">{formatDate(transaction.date)}</div>
              <div className="description">{transaction.description}</div>
              <div className={`amount ${transaction.amount < 0 ? 'expense' : ''}`}>
                {transaction.amount > 0 ? '+' : ''}
                {formatCurrency(transaction.amount)}원
              </div>
              <div className="buttons">
                {editingIndex === index && (
                  <div className="edit-form">
                    <label>
                      설명:
                      <input
                        type="text"
                        value={editedTransaction.description}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, description: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      금액:
                      <input
                        type="text"
                        value={editedTransaction.amount}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, amount: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      날짜 (YYYYMMDD):
                      <input
                        type="text"
                        value={editedTransaction.date}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, date: e.target.value })
                        }
                      />
                    </label>
                    <button className="edit" onClick={() => handleEditTransaction(index)}>
                      수정 완료
                    </button>
                  </div>
                )}
                {editingIndex !== index && (
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
