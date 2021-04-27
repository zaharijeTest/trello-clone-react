import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux' 
import userSaga from './user/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import boardsSaga from './board/sagas';
import { userReducers } from './user/reducer';
import { boardsReducer } from './board/reducer';

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
    userStore: userReducers,
    boardsStore: boardsReducer
})
export const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(userSaga);
sagaMiddleware.run(boardsSaga)

