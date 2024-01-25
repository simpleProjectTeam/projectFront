import React from "react";
import './styles.css';

function AccountSummary({ accounts }) {
  // 데이터값이 없을 때
  if (!accounts || accounts.length === 0) {
    return (
      <div className="summary-container">
        <h2>자산: 원</h2>
        <h3 className="charge-sum">수입 금액: 원</h3>
        <h3 className="charge-minus">지출 금액: 원</h3>
      </div>
    );
  }

  // 수입 관리 로직
  const calculateTotalIncome = () => {
    return accounts.reduce((total, account) => {
      const price = parseFloat(account.price.replace(/[^\d.-]/g, '')) || 0; // 숫자 이외의 문자 제거 후 parseFloat
      return price > 0 ? total + price : total;
    }, 0);
  };

  // 지출 관리 로직
  const calculateTotalExpense = () => {
    return accounts.reduce((total, account) => {
      const price = parseFloat(account.price.replace(/[^\d.-]/g, '')) || 0; // 숫자 이외의 문자 제거 후 parseFloat
      return price < 0 ? total + Math.abs(price) : total;
    }, 0);
  };
  
  // 전체 자산 관리 로직
  const calculateTotalAssets = () => {
    return accounts.reduce((total, account) => {
      const price = parseFloat(account.price.replace(/[^\d.-]/g, '')) || 0; // 숫자 이외의 문자 제거 후 parseFloat
      return total + price;
    }, 0);
  };

  return (
    <div className="summary-container">
      <h2>자산: {calculateTotalAssets()}원</h2>
      <h3 className="charge-sum">수입 금액: {calculateTotalIncome()}원</h3>
      <h3 className="charge-minus">지출 금액: {calculateTotalExpense()}원</h3>
    </div>
  );
}

export default AccountSummary;