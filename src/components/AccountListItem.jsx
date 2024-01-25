import React, { useState } from "react";
import './styles.css';

function AccountListItem({ account, setAccounts }) {
  const { no, content, price } = account;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedPrice, setEditedPrice] = useState(price);

  const onDelete = async () => {
    const checkResponse = await fetch(`https://projectback.fly.dev/book/account/${no}`);
    if (checkResponse.status === 200) {
      await fetch(`https://projectback.fly.dev/book/account/${no}`, {
        method: 'DELETE'
      });
  
      await fetch("https://projectback.fly.dev/book/account")
        .then((res) => res.json())
        .then((result) => setAccounts(result.data));
    } else {
      console.error(`Item with No. ${no} not found`);
    }
  }

  const onEdit = () => {
    // 수정 버튼을 누를 때
    setIsEditing(true);

    // 수정 폼에 현재 값들을 플레이스홀더로 설정
    setEditedContent(content);
    setEditedPrice(''); // 금액은 빈 값으로 설정
  }

  const onSaveEdit = async () => {
    await fetch(`https://projectback.fly.dev/book/account/${no}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: editedContent,
        price: editedPrice
      })
    });
  
    await fetch("https://projectback.fly.dev/book/account")
      .then((res) => res.json())
      .then((result) => setAccounts(result.data));
  
    setIsEditing(false);
  }

  const onCancelEdit = () => {
    setIsEditing(false);
  }

  const onContentChange = (e) => {
    setEditedContent(e.target.value);
  }

  const onPriceChange = (e) => {
    setEditedPrice(e.target.value);
  }

  return (
    <div className="account-item">
      {isEditing ? (
        <>
          <label> 수정 제목 </label>
          <input
            type="text"
            value={editedContent}
            onChange={onContentChange}
            placeholder="설명"
          />
          <label> 수정 금액 </label>
          <input
            type="text"
            value={editedPrice}
            onChange={onPriceChange}
            placeholder="금액" 
          />
    <button className="save-button" onClick={onSaveEdit}>저장</button>
    <button className="cancel-button" onClick={onCancelEdit}>취소</button>
        </>
      ) : (
        <>
            <h2>{content} </h2>
            <p>{price}원</p>
            <div>
              <button className="edit-button" onClick={onEdit}>수정</button>
            </div>
            <div>
              <button className="delete-button" onClick={onDelete}>삭제</button>
            </div>
        </>
      )}
    </div>
  );
}

export default AccountListItem;