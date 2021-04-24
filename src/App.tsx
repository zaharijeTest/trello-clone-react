import React, { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter as Router, Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';
import LoginPage from './pages/login/login';
import { ProtectedRoute } from './shared/components/protected-route/protected-route';
import { getUser } from './core/store/user/actions';
import { IUser } from './@types/user';
import './core/store/store';
import './App.css';
import { IStore } from './@types/store';
import BoardsListPage  from './pages/boards-list/boards-list';

interface IAppProps {
  user?: IUser | null;
  getUser?: any;
}

const App:FunctionComponent<IAppProps> = ({getUser, user}) => {
  useEffect(() => {
    getUser();
  },[]);
  const isAuthenticated = !!user?.id
  return (
      <div className="container">
        <Header></Header>
        <Router>
          <Route exact path="/about"> <span>About</span></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <ProtectedRoute isAuthenticated={isAuthenticated} path={['/home']} Component={BoardsListPage}> </ProtectedRoute>
          <Route path="/" component={LoginPage}></Route>
        </Router>
        <Footer></Footer>
      </div>
  );
}

const mapStateToProps = (store: IStore): IAppProps => {
  const { user } = store;
  return {
    user
  }
}

const mapDispatchToProps = {
  getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
