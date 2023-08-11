import {
  call,
  all,
  takeLatest,
  fork,
  put,
  delay,
  take,
} from 'redux-saga/effects';

import {
  getCall,
  putCall,
  failureActionProceed,
  postCall,
} from '@/utils/common';
import { userActions } from '.';

const {
  // get user
  requestGetUser,
  successGetUser,
  removeAuthentication,
  // get alternative vacation
  requestGetUsableAlternativeVacation,
  successGetUsableAlternativeVacation,
  failureGetUsableAlternativeVacation,
  // update user avatar
  requestUpdateUserAvatar,
  successUpdateUserAvatar,
  failureUpdateUserAvatar,
  // update signature
  requestUpdateSignature,
  successUpdateSignature,
  failureUpdateSignature,
  // get all user
  requestGetAllUser,
  successGetAllUser,
  failureGetAllUser,
  // change password
  requestChangePassword,
  successChangePassword,
  failureChangePassword,
} = userActions;

function* callGetUser(action: ReturnType<typeof requestGetUser>) {
  const { exceptionHandle, handleAfter } = action.payload;

  const response: ApiResponse<User> = yield call(getCall, '/api/user', null);

  if (response.state === 'SUCCESS') {
    yield put(successGetUser(response.data));

    handleAfter && handleAfter();
  } else {
    yield failureActionProceed(response, null, exceptionHandle);
  }

  // yield delay(2_000);
}

function* watchLoggedIn() {
  yield takeLatest(requestGetUser, callGetUser);
}

// get alternative vacation
function* callGetUsableAternativeVacation(
  action: ReturnType<typeof requestGetUsableAlternativeVacation>,
) {
  const { handleAuthException } = action.payload;

  const response: ApiResponse<AlternativeVacation[]> = yield getCall(
    '/api/user/alternative/vacation/usable',
    null,
  );

  if (response.state === 'SUCCESS') {
    yield put(successGetUsableAlternativeVacation(response.data || []));
  } else {
    yield failureActionProceed(
      response,
      failureGetUsableAlternativeVacation,
      handleAuthException,
    );
  }
}

function* watchGetUsableAlternativeVacation() {
  yield takeLatest(
    requestGetUsableAlternativeVacation,
    callGetUsableAternativeVacation,
  );
}

// update user avatar
function* callUpdateUserAvatar(
  action: ReturnType<typeof requestUpdateUserAvatar>,
) {
  const { formData, exceptionHandle, handleAfter } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<User> = yield call(
    postCall,
    `/api/user/avatar`,
    formData,
  );

  if (response.state === 'SUCCESS') {
    yield put(successUpdateUserAvatar());

    handleAfter && handleAfter();
  } else {
    yield failureActionProceed(
      response,
      failureUpdateUserAvatar,
      handleAuthError,
    );
  }
}

function* watchUpdateUserAvatar() {
  yield takeLatest(requestUpdateUserAvatar, callUpdateUserAvatar);
}

// update signature
function* callUpdateSignature(
  action: ReturnType<typeof requestUpdateSignature>,
) {
  const { id, formData, exceptionHandle, handleAfter } = action.payload;

  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<User> = yield call(
    postCall,
    `/api/user/${id}/document/signature`,
    formData,
  );

  if (response.state === 'SUCCESS') {
    yield put(successUpdateSignature());

    handleAfter && handleAfter();
  } else {
    yield failureActionProceed(
      response,
      failureUpdateSignature,
      handleAuthError,
    );
  }
}

function* watchRequestUpdateSignature() {
  yield takeLatest(requestUpdateSignature, callUpdateSignature);
}

// get all user
function* callGetAllUser() {
  const response: ApiResponse<User[]> = yield call(getCall, '/api/user/all');

  if (response.state === 'SUCCESS') {
    yield put(successGetAllUser(response.data || []));
  } else {
    yield put(failureGetAllUser());
  }
}

function* watchReqeustGetAllUser() {
  yield takeLatest(requestGetAllUser, callGetAllUser);
}

// change password
function* callChangePassword(action: ReturnType<typeof requestChangePassword>) {
  const { userId, changePassword } = action.payload;

  const apiResponse: ApiResponse<User> = yield call(
    putCall,
    `/api/user/${userId}/password`,
    { password: changePassword },
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successChangePassword());
  } else {
    yield put(failureChangePassword());
  }
}

function* watchRequestChangePassword() {
  yield takeLatest(requestChangePassword, callChangePassword);
}

export default function* userSagas() {
  yield all([
    fork(watchLoggedIn),
    fork(watchGetUsableAlternativeVacation),
    fork(watchUpdateUserAvatar),
    fork(watchRequestUpdateSignature),
    fork(watchReqeustGetAllUser),
    fork(watchRequestChangePassword),
  ]);
}
