import React, { useState } from "react";
import './styles.css';

function AccountInsert({ setAccounts }) {
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('');

  const onSave = async (formattedAmount) => {
    // 서버에 데이터 저장
    await fetch("https://projectback.fly.dev/book/account", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        price: formattedAmount,
      })
    });

    // 서버에서 최신 데이터 불러오기
    const response = await fetch("https://projectback.fly.dev/book/account");
    const result = await response.json();
    setAccounts(result.data);

    // 저장 후 입력값 초기화
    setContent('');
    setAmount('');
  };

  const formatAmount = (inputAmount) => {
    // 입력된 금액을 소수점 3자리로 고정하여 반환
    return Number(parseFloat(inputAmount).toFixed(3));
  };

  const handleTransaction = (type) => {
    // 버튼 종류에 따라 처리
    const formattedAmount = type === 'income' ? formatAmount(amount) : -formatAmount(amount);
    onSave(formattedAmount);
  };

  const handleChange = (e, setter) => {
    // 입력값 변경 시
    setter(e.target.value);
  };

  return (
    <div >
      <form className="form-container">
        <h2 > 거래 내역 작성</h2>
        <input
          placeholder="설명"
          type="text"
          value={content}
          onChange={(e) => handleChange(e, setContent)}
        />
        
        <input
          placeholder="금액"
          type="text"
          value={amount}
          onChange={(e) => handleChange(e, setAmount)}
        />
        <button type="button" onClick={() => handleTransaction('income')}>
          수입
        </button>
        <button type="button" onClick={() => handleTransaction('expense')}>
          지출
        </button>
      </form>
      <h2> </h2>
      <div>
        <h2  className="form-container">거래 내역</h2>
      </div>
      <h2> </h2>
    </div>

    
  );
}

export default AccountInsert;