import { AuthenticationService } from "../../services/authentication.service"
import { call, put, takeLatest } from 'redux-saga/effects'
import { setUserAction, USER_ACTIONS } from "./actions";

const authenticationService = new AuthenticationService();

function *getUser() {
    const user = yield call(authenticationService.getUser.bind(authenticationService));
    yield put(setUserAction(user));
}

function *userSaga() {
    yield takeLatest(USER_ACTIONS.GET_USER, getUser);
};

export default userSaga;