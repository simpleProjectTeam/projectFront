import React from "react";
import AccountListItem from "./AccountListItem";
import './styles.css';

function AccountList({ accounts, setAccounts, fetchAndSetAccounts }) {
  return (
    <div className="account-list-container">
      <h2  className="form-container">거래 내역</h2>
      {accounts && accounts.map(account => (
        <AccountListItem
          key={account.id}
          account={account}
          setAccounts={setAccounts}
          fetchAndSetAccounts={fetchAndSetAccounts}
        />
      ))}
    </div>
  );
}

export default AccountList;