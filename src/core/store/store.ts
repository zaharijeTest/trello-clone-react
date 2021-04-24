import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux' 
import userSaga from './user/sagas';
import { reducers } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import boardsSaga from './board/sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(userSaga);
sagaMiddleware.run(boardsSaga)

