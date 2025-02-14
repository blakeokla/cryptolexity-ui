import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #2a2a2a;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <div>Chat</div>
      <ActionButtons>
        <Button>Share</Button>
        <Button>Bookmark</Button>
      </ActionButtons>
    </HeaderContainer>
  );
}

export default Header; 