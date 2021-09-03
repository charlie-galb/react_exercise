import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import Banner from './components/Banner'
import Home from './pages/Home/Home'
import CreateRecipe from './pages/CreateRecipe/CreateRecipe'
import Recipe from './pages/Recipe/Recipe'
import retrieveRecipes from './api/retrieveRecipes'
import RecipeType from './types/Recipe'

const App = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([])

  useEffect(() => {
    retrieveRecipes(setRecipes)
  }, [])
  
  return (
    <Router>
      <GlobalStyle />
      <Banner>Recipe Manager</Banner>
      <Switch>
        <Route exact path='/' render={
          () => <Home recipes={recipes} />} />
        <Route path='/create_recipe' render={
          () => <CreateRecipe recipes={recipes} setRecipes={setRecipes} />} />
        <Route path='/:id' render={
          () => <Recipe recipes={recipes} setRecipes={setRecipes} />} />
      </Switch>
    </Router>
  );
}

export default App;
