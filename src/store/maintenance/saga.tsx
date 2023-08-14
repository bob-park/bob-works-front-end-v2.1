import {
  call,
  all,
  takeLatest,
  fork,
  put,
  delay,
  take,
} from 'redux-saga/effects';

import { getCall, putCall, postCall } from '@/utils/common';

import { maintenanceActions } from '.';
import { CustomerChat, CustomerChatRoom } from './types';
import { Pageable } from '@/store/types';

import { randomUUID } from 'crypto';

const {
  // get customer chat room
  requestGetLatestCustomerChatRoom,
  successGetLatestCustomerChatRoom,
  failureGetLatestCustomerChatRoom,
  // create customer chat room
  requestCreateCustomerChatRoom,
  successCreateCustomerChatRoom,
  failureCreateCustomerChatRoom,
  // get customer chat list
  requestGetCustomerChatList,
  successGetCustomerChatList,
  failureGetCustomerChatList,
  // send custoemr chat
  requestSendCustomerChat,
  successSendCustomerChat,
  failureSendCustomerChat,
} = maintenanceActions;

// get customer chat room
function* callGetLatestCustomerRoom(
  action: ReturnType<typeof requestGetLatestCustomerChatRoom>,
) {
  const apiResponse: ApiResponse<CustomerChatRoom> = yield call(
    getCall,
    '/api/maintenance/customer/chat/room/latest',
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successGetLatestCustomerChatRoom(apiResponse.data));
  } else {
    // * 404 인 경우 customer chat 을 생성한다.
    if (apiResponse.status == 404) {
      yield put(requestCreateCustomerChatRoom({ title: 'customer chat' }));
    } else {
      yield put(failureGetLatestCustomerChatRoom());
    }
  }
}

function* watchRequestGetLatestCustomerChatRoom() {
  yield takeLatest(requestGetLatestCustomerChatRoom, callGetLatestCustomerRoom);
}

// create customer chat room
function* callCreateCustomerRoom(
  action: ReturnType<typeof requestCreateCustomerChatRoom>,
) {
  const { title } = action.payload;

  const apiResponse: ApiResponse<CustomerChatRoom> = yield call(
    postCall,
    '/api/maintenance/customer/chat/room',
    {
      title,
    },
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successCreateCustomerChatRoom(apiResponse.data));
  } else {
    yield put(failureCreateCustomerChatRoom());
  }
}

function* watchRequestCreateCustomerChatRoom() {
  yield takeLatest(requestCreateCustomerChatRoom, callCreateCustomerRoom);
}

// get customer chat list
function* callGetCustomerChatList(
  action: ReturnType<typeof requestGetCustomerChatList>,
) {
  const { roomId, page, size } = action.payload;

  const apiResponse: ApiResponse<Pageable<CustomerChat>> = yield call(
    getCall,
    `/api/maintenance/customer/chat/${roomId}`,
    {
      page,
      size,
    },
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successGetCustomerChatList(apiResponse.data));
  } else {
    yield put(failureGetCustomerChatList());
  }
}

function* watchRequestGetCustomerChatList() {
  yield takeLatest(requestGetCustomerChatList, callGetCustomerChatList);
}

// send custoemr chat
function* callSendCustomerChat(
  action: ReturnType<typeof requestSendCustomerChat>,
) {
  const { roomId, userId, userUniqueId, contents } = action.payload;

  const apiResponse: ApiResponse<CustomerChat> = yield call(
    postCall,
    `/api/maintenance/customer/chat/${roomId}`,
    {
      contents,
    },
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(
      successSendCustomerChat({
        id: apiResponse.data?.id || randomUUID().toString(),
        contents,
        userId,
        userUniqueId,
        createdDate: new Date(),
      }),
    );
  } else {
    yield put(failureSendCustomerChat());
  }
}

function* watchRequestSendCustomerChat() {
  yield takeLatest(requestSendCustomerChat, callSendCustomerChat);
}

export default function* maintenanceSagas() {
  yield all([
    fork(watchRequestGetLatestCustomerChatRoom),
    fork(watchRequestCreateCustomerChatRoom),
    fork(watchRequestGetCustomerChatList),
    fork(watchRequestSendCustomerChat),
  ]);
}
