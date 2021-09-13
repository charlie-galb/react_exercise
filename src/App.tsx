import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import { Banner, Link } from './components'
import Home from './pages/Home/Home'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import Recipe from './pages/Recipe/Recipe'
import UpdateRecipe from './pages/UpdateRecipe/UpdateRecipe'

const App = () => {
  
  return (
    <Router>
      <GlobalStyle />
      <Banner><Link disableStyling={true} to='/'>Recipe Manager</Link></Banner>
      <Switch>
        <Route exact path='/' render={
          () => <Home />} />
        <Route exact path='/add_recipe' render={
          () => <AddRecipe />} />
        <Route exact path='/:id' render={
          () => <Recipe />} />
        <Route exact path='/:id/update' render={
          () => <UpdateRecipe />} />
      </Switch>
    </Router>
  );
}

export default App;
