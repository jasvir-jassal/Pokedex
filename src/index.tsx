import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PokemonDetail from "./pages/pokemon/pokemon";
import Pagination from "./components/pagination";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={"/pokemons/:id"}>
          <PokemonDetail />
        </Route>
        <Route path={"/pokemons"}>
          <Pagination />
        </Route>
        <Route path={"/"}>
          <Redirect to='/pokemons'/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
