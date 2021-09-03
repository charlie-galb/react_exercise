import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import Banner from './components/Banner'
import Home from './pages/Home/Home'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import Recipe from './pages/Recipe/Recipe'
import UpdateRecipe from './pages/UpdateRecipe/UpdateRecipe'
import retrieveRecipes from './api/retrieveRecipes'
import RecipeType from './types/Recipe'

const App = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([])

  const retrieveAndSetRecipes = async () => {
    try {
      const newRecipes = await retrieveRecipes()
      setRecipes(newRecipes)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    retrieveAndSetRecipes()
  }, [])
  
  return (
    <Router>
      <GlobalStyle />
      <Banner>Recipe Manager</Banner>
      <Switch>
        <Route exact path='/' render={
          () => <Home recipes={recipes} />} />
        <Route exact path='/add_recipe' render={
          () => <AddRecipe recipes={recipes} setRecipes={setRecipes} />} />
        <Route exact path='/:id' render={
          () => <Recipe recipes={recipes} setRecipes={setRecipes} />} />
        <Route exact path='/:id/update' render={
          () => <UpdateRecipe setRecipes={setRecipes} recipes={recipes} />} />
      </Switch>
    </Router>
  );
}

export default App;
