import React from 'react';

import GlobalStyle from './GlobalStyle';
import AppHeader from './components/Header/Header'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppHeader>Recipe Manager</AppHeader>
      <Home />
    </>
  );
}

export default App;
