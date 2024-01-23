import React from "react";
import './styles.css';

function AccountTemplate({ children }) {
  return (
    <div className="template-container">
    <h1 className="template-title">개인수입지출내역</h1>
    {children}
    </div>
  );
}

export default AccountTemplate;