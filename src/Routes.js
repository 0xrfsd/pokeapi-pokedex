import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Pokedex from './screens/Deck';
// import Pokemon from './screens/Pokemon';
import Pokemons from './screens/Pokemons';
import Home from './screens/Home';
import Type from './screens/Type';

export default function Routes() {

  return (
    <Router>    
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/deck" component={Pokedex}/>
        {/* <Route path="/pokemon/:pokemon" component={Pokemon}/> */}
        <Route path="/pokemons" component={Pokemons}/>
        <Route path="/type/:type" component={Type}/>
        </Switch>
    </Router>
  );
}