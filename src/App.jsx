import React, { useEffect, useState } from "react";
import AccountInsert from "./components/AccountInsert";
import AccountList from "./components/AccountList";
import AccountTemplate from "./components/AccountTemplate";
import AccountSummary from "./components/AccountSummary";

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch("https://projectback.fly.dev/book/account");
      const result = await response.json();
      setAccounts(result.data);
    };
    fetchAccounts();
  }, []);

  return (
    <AccountTemplate>
      <AccountSummary accounts={accounts} />
      <AccountInsert setAccounts={setAccounts} />
      <AccountList accounts={accounts} setAccounts={setAccounts} />
    </AccountTemplate>
  );
}

export default App;