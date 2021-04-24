import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';
import LoginPage from './pages/login/login';
import { ProtectedRoute } from './shared/components/protected-route/protected-route';
import { store } from './core/store/main';
import { ACTIONS } from './core/store/actions';
import { IUser } from './@types/user';
import './core/store/main';
import './App.css';

interface IAppProps {
  user: IUser;
}
const App:FunctionComponent<IAppProps> = (props) => {
  useEffect(() => {
    store.dispatch({ type: ACTIONS.USER_ACTIONS.GET_USER });
  },[]);

  return (
      <div className="container">
        <Header></Header>
        <Router>
          <Route exact path="/about"> <span>About</span></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <ProtectedRoute isAuthenticated={!!props.user?.id} path={['/home']} >  <span>Home</span> </ProtectedRoute>
          <Route path="/" component={LoginPage}></Route>
        </Router>
        <Footer></Footer>
      </div>
  );
}

const mapStateToProps = (state): IAppProps => {
  const { user } = state;
  return {
    user
  }
}
export default connect(mapStateToProps)(App);
