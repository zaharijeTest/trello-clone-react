import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux' 
import userSaga from '../../pages/login/sagas/sagas';
import { reducers } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(userSaga);

