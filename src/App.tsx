import React from 'react';

import GlobalStyle from './GlobalStyle';
import AppHeader from './components/Header/Header'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppHeader>Recipe Manager</AppHeader>
    </>
  );
}

export default App;
