import React from "react";
// import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./pages/Details";
import TopRated from "./pages/TopRated";
import MostPopular from "./pages/MostPopular";
import Home from "./pages/Home";
import RandomNight from "./pages/RandomNight";
import AppNavbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppNavbar />
        <div style={{ backgroundColor: "#333", color: "#eee", height: "100%" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/generate">
              <RandomNight />
            </Route>
            <Route exact path="/details/:slug">
              <Details />
            </Route>
            <Route exact path="/toprated">
              <TopRated />
            </Route>
            <Route exact path="/mostpopular">
              <MostPopular />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
