import { call, all, takeLatest, fork, put, delay } from 'redux-saga/effects';

import {
  getCall,
  postCall,
  deleteCall,
  putCall,
  failureActionProceed,
} from '@/utils/common';

import { commonActions } from '@/store/common';
import { userActions } from '@/store/user';
import { documentActions } from '.';
import {
  DocumentApproval,
  Documents,
  DocumentsType,
  VacationDocumentDetail,
} from './types';
import { Pageable } from '../types';

const { addAlert } = commonActions;
const { removeAuthentication } = userActions;
const {
  // get document type
  requestGetDocumentType,
  successGetdocumentType,
  failureGetDocumentType,
  // add vacation document
  requestAddVacationDocument,
  successAddVacationDocumnet,
  failureAddVacationDocument,
  // search document
  requestSearchDocument,
  successSearchDocument,
  failureSearchDocument,
  // get vacation document
  requestGetVacationDocument,
  successGetVacationDocument,
  failureGetVacationDocument,
  // cancel document
  requestCancelDocument,
  successCancelDocument,
  failureCancelDocument,
  // get approval documents
  requestApprovalDocuments,
  successApprovalDocuments,
  failureApprovalDocuments,
  // get approval document
  requestApprovalDocument,
  successApprovalDocument,
  failureApprovalDocument,
  // proceed approval document
  requestProceedApprovalDocument,
  successProceedApprovalDocument,
  failureProceedApprovalDocument,
} = documentActions;

// get document type
function* callGetDocumentType(
  action: ReturnType<typeof requestGetDocumentType>,
) {
  const { handleAuthError } = action.payload;

  const apiResponse: ApiResponse<DocumentsType[]> = yield getCall(
    '/api/document/type/search',
    null,
  );

  if (apiResponse.state === 'SUCCESS') {
    yield put(successGetdocumentType(apiResponse.data || []));
  } else {
    yield failureActionProceed(
      apiResponse,
      failureGetDocumentType,
      handleAuthError,
    );
  }
}

function* watchRequestGetDocumentType() {
  yield takeLatest(requestGetDocumentType, callGetDocumentType);
}

// add vacation document
function* callAddVacationDocument(
  action: ReturnType<typeof requestAddVacationDocument>,
) {
  const { body, afterHandle, handleException } = action.payload;
  const { handleAuthError } = handleException;

  const response: ApiResponse<Documents> = yield postCall(
    '/api/document/vacation',
    body,
  );

  if (response.state === 'SUCCESS') {
    yield put(successAddVacationDocumnet(response.data));

    yield put(
      addAlert({
        level: 'info',
        message: '휴가계가 신청되었습니다.',
        createAt: new Date(),
      }),
    );

    afterHandle && afterHandle();
  } else {
    yield failureActionProceed(
      response,
      failureAddVacationDocument,
      handleAuthError,
    );
  }
}

function* watchAddVacationDocument() {
  yield takeLatest(requestAddVacationDocument, callAddVacationDocument);
}

// search document
function* callSearchDocument(action: ReturnType<typeof requestSearchDocument>) {
  const { params, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Pageable<Documents>> = yield getCall(
    '/api/document/search',
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(successSearchDocument(response.data));
  } else {
    yield failureActionProceed(
      response,
      failureSearchDocument,
      handleAuthError,
    );
  }
}

function* watchRequestSearchDocument() {
  yield takeLatest(requestSearchDocument, callSearchDocument);
}

// get vacation document
function* callGetVacationDocument(
  action: ReturnType<typeof requestGetVacationDocument>,
) {
  const { id, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<VacationDocumentDetail> = yield call(
    getCall,
    `/api/document/vacation/${id}`,
    null,
  );

  if (response.state === 'SUCCESS') {
    if (!response.data) {
      yield put(failureGetVacationDocument());
      throw new Error('No exist data');
    }

    yield put(successGetVacationDocument(response.data));
  } else {
    yield failureActionProceed(
      response,
      failureGetVacationDocument,
      handleAuthError,
    );
  }
}

function* watchRequestGetVacationDocument() {
  yield takeLatest(requestGetVacationDocument, callGetVacationDocument);
}

// cancel document
function* callCancelDocument(action: ReturnType<typeof requestCancelDocument>) {
  const { id, afterHandle, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Documents> = yield call(
    deleteCall,
    `/api/document/${id}/cancel`,
  );

  if (response.state === 'SUCCESS') {
    yield put(successCancelDocument());

    yield put(
      addAlert({
        level: 'info',
        message: '휴가계가 취소되었습니다.',
        createAt: new Date(),
      }),
    );

    afterHandle && afterHandle();
  } else {
    yield failureActionProceed(
      response,
      failureCancelDocument,
      handleAuthError,
    );
  }
}

function* watchCancelDocument() {
  yield takeLatest(requestCancelDocument, callCancelDocument);
}

//  get approval documents
function* callgetApprovalDocuments(
  action: ReturnType<typeof requestApprovalDocuments>,
) {
  const { params, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<Pageable<DocumentApproval>> = yield call(
    getCall,
    `/api/document/approval/search`,
    params,
  );

  if (response.state === 'SUCCESS') {
    yield put(successApprovalDocuments(response.data));
  } else {
    yield failureActionProceed(
      response,
      failureApprovalDocuments,
      handleAuthError,
    );
  }
}

function* watchGetApprovalDocuments() {
  yield takeLatest(requestApprovalDocuments, callgetApprovalDocuments);
}

//  get approval document
function* callgetApprovalDocument(
  action: ReturnType<typeof requestApprovalDocument>,
) {
  const { approvalId, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<DocumentApproval> = yield call(
    getCall,
    `/api/document/approval/${approvalId}`,
    null,
  );

  if (response.state === 'SUCCESS') {
    yield put(successApprovalDocument(response.data));
  } else {
    yield failureActionProceed(
      response,
      failureApprovalDocument,
      handleAuthError,
    );
  }
}

function* watchGetApprovalDocument() {
  yield takeLatest(requestApprovalDocument, callgetApprovalDocument);
}

//  proceed apprval document
function* callProceedApprovalDocument(
  action: ReturnType<typeof requestProceedApprovalDocument>,
) {
  const { approvalId, body, afterHandle, exceptionHandle } = action.payload;
  const { handleAuthError } = exceptionHandle;

  const response: ApiResponse<DocumentApproval> = yield call(
    putCall,
    `/api/document/approval/${approvalId}`,
    body,
  );

  if (response.state === 'SUCCESS') {
    yield put(successProceedApprovalDocument());

    yield put(
      addAlert({
        level: 'info',
        message: `문서가 결재 ${
          body.status === 'APPROVE' ? '승인' : '반려'
        } 처리되었습니다.`,
        createAt: new Date(),
      }),
    );

    afterHandle && afterHandle();
  } else {
    yield failureActionProceed(
      response,
      failureProceedApprovalDocument,
      handleAuthError,
    );
  }
}

function* watchProceedApprovalDocument() {
  yield takeLatest(requestProceedApprovalDocument, callProceedApprovalDocument);
}

export default function* documentSagas() {
  yield all([
    fork(watchRequestGetDocumentType),
    fork(watchAddVacationDocument),
    fork(watchRequestSearchDocument),
    fork(watchRequestGetVacationDocument),
    fork(watchCancelDocument),
    fork(watchGetApprovalDocuments),
    fork(watchGetApprovalDocument),
    fork(watchProceedApprovalDocument),
  ]);
}
