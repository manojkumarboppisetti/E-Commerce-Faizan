import {all, put, call, takeLatest} from 'redux-saga/effects';
import {USER_ACTION_TYPES} from "./user.types";
import {signInSuccess, signInFailed} from "./user.action";
import {getCurrentUser, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
        console.log("userSnapshot", userSnapshot);
    } catch (error) {
        console.log("error", error);
        yield put(signInFailed());
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (userAuth) {
            yield call(getSnapshotFromUserAuth,userAuth);
        } else {
            yield put(signInFailed());
        }
    } catch (error) {
        yield put(signInFailed());

    }
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* userSaga() {
    yield all([call(onCheckUserSession)]);
}

