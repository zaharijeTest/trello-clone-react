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
import { IDispatch, IMapToProps, INullable, IStore } from './@types/store';
import BoardsListPage from './pages/boards-list/boards-list';

interface IAppStateProps {
  user: INullable<IUser>;
}

interface IAppDispatchProps {
  getUser: IDispatch;
}

interface IAppProps extends IAppStateProps, IAppDispatchProps{}

const App: FunctionComponent<IAppProps> = ({ getUser, user }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  const isAuthenticated = !!user?.id

  return (
    <div className="container">
      <Header></Header>
        <Router>
          <Route exact path="/about"> <span>About</span></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <ProtectedRoute isAuthenticated={isAuthenticated} path={['/boards/:boardId']}> SPECIFIC BOARD </ProtectedRoute>
          <ProtectedRoute isAuthenticated={isAuthenticated} path={['/boards']} Component={BoardsListPage}> </ProtectedRoute>
          <Route path="/" component={LoginPage}></Route>
        </Router>
      <Footer></Footer>
    </div>
  );
}

const mapProps: IMapToProps<IAppStateProps,IAppDispatchProps> = [
  (store: IStore) => ({user: store.user}),
  {getUser}
]

export default connect(...mapProps)(App);
