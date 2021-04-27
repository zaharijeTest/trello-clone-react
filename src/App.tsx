import React, { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { connect } from 'react-redux';
import { Footer } from './pages/footer/footer';
import { Header } from './pages/header/header';
import { ProtectedRoute } from './shared/components/protected-route/protected-route';
import { getUserAction } from './core/store/user/actions';
import { IUser } from './@types/user';
import './core/store/store';
import './App.css';
import './index.css';
import { IDispatch, IMapToProps, INullable, IStore } from './@types/store';
import { ROUTES } from './core/routes';
import { NotFound } from './pages/not-found/not-found';

interface IAppStateProps {
  user: INullable<IUser>;
}

interface IAppDispatchProps {
  getUserAction: IDispatch;
}

interface IAppProps extends IAppStateProps, IAppDispatchProps{}

const App: FunctionComponent<IAppProps> = ({ getUserAction, user }) => {
  useEffect(() => {
    getUserAction();
  }, [getUserAction]);

  const isAuthenticated = !!user?.id
  return (
    <div className="container">
      <Header></Header>
      {user !== undefined && 
      <Router>
        <Switch>
          {ROUTES.map((route, index) => {
            if(route.protected) {
              return <ProtectedRoute isAuthenticated={isAuthenticated} path={route.path} component={route.component} key={index}></ProtectedRoute>
            }
            return <Route exact path={route.path} component={route.component} key={index}></Route>
          })
          }
          <Route exact component={NotFound}></Route>
        </Switch>
        </Router>
        }
      <Footer></Footer>
    </div>
  );
}

const mapProps: IMapToProps<IAppStateProps,IAppDispatchProps> = [
  (store: IStore) => ({user: store.userStore.user}),
  {getUserAction}
]

export default connect(...mapProps)(App);
