import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import AppHeader from './components/Header'
import Home from './pages/Home/Home'
import CreateRecipe from './pages/CreateRecipe/CreateRecipe'
import Recipe from './pages/Recipe/Recipe'

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppHeader>Recipe Manager</AppHeader>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/create_recipe' component={CreateRecipe} />
        <Route path='/:id' component={Recipe}/>
      </Switch>
    </Router>
  );
}

export default App;
