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
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTransaction, setEditedTransaction] = useState({
    description: '',
    amount: '',
    type: 'income',
  });

  const isNumberOrNegative = (value) => {
    return /^-?\d+$/.test(value);
  };

  const handleTransaction = (type) => {
    if (isNumberOrNegative(newTransaction.amount)) {
      const signedAmount = type === 'income' ? parseInt(newTransaction.amount, 10) : -parseInt(newTransaction.amount, 10);
      setTransactions([...transactions, { ...newTransaction, amount: signedAmount }]);
      setNewTransaction({ description: '', amount: '', type: 'income' });
    } else {
      alert('유효한 숫자 또는 음수를 입력하세요.');
    }
  };

  const handleEditTransaction = (index) => {
    if (isNumberOrNegative(editedTransaction.amount)) {
      const editedTransactions = [...transactions];
      const signedAmount = editedTransaction.type === 'income' ? parseInt(editedTransaction.amount, 10) : -parseInt(editedTransaction.amount, 10);
      editedTransactions[index] = { ...editedTransaction, amount: signedAmount };
      setTransactions(editedTransactions);
      setEditedTransaction({ description: '', amount: '', type: 'income' });
      setEditingIndex(-1);
    } else {
      alert('유효한 숫자 또는 음수를 입력하세요.');
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
      />
    </div>
  );
};

export default App;
