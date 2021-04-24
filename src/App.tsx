import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import './App.css';
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';

function App() {

  return (
    <div className="container">
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/about">
              About
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </Router>
        <Footer></Footer>
    </div>
  );
}

export default App;
