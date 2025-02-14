import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  background: linear-gradient(to bottom, #1a1a1a, #0f0f0f);
  color: #fff;
  min-height: 100vh;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainSection>
          <Header />
          <MainContent />
        </MainSection>
      </AppContainer>
    </Router>
  );
}

export default App;
