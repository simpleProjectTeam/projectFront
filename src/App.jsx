import React, { useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

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

  const isValidDate = (dateString) => {
    const regex = /^\d{8}$/;
    return regex.test(dateString);
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
        <TransactionForm
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          handleTransaction={handleTransaction}
          isNumberOrNegative={isNumberOrNegative}
          isValidDate={isValidDate}
        />
      </div>
      <TransactionList
        transactions={transactions}
        editingIndex={editingIndex}
        editedTransaction={editedTransaction}
        setEditedTransaction={setEditedTransaction}
        handleEditTransaction={handleEditTransaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </div>
  );
};

export default App;
