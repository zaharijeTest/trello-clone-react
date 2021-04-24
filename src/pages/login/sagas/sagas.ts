import { AuthenticationService } from "../../../core/services/authentication.service"
import { call, put, takeLatest } from 'redux-saga/effects'
import { USER_ACTIONS } from "./actions";
const authenticationService = new AuthenticationService();

function *getUser() {
    const user = yield call(authenticationService.getUser.bind(authenticationService));
    yield put({type: USER_ACTIONS.USER, user: user});
}

function *userSaga() {
    yield takeLatest(USER_ACTIONS.GET_USER, getUser);
};

export default userSaga;