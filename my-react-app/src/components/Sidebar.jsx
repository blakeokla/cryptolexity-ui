import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 260px;
  background-color: #1a1a1a;
  border-right: 1px solid #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const NewThread = styled.button`
  background-color: #2a2a2a;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #999;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>Cryptolexity</Logo>
      <NewThread>New Thread ⌘ K</NewThread>
      {/* <nav>
        <NavItem>🔍 Home</NavItem>
        <NavItem>🌎 Discover</NavItem>
        <NavItem>💠 Spaces</NavItem>
        <NavItem>📚 Library</NavItem>
      </nav> */}
    </SidebarContainer>
  );
}

export default Sidebar;