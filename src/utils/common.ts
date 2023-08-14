import axios from 'axios';
import { put } from 'redux-saga/effects';

import { commonActions } from '@/store/common';
import { userActions } from '@/store/user';

const { addAlert } = commonActions;
const { removeAuthentication } = userActions;

export const client = axios.create({
  baseURL: process.env.CLIENT_SERVICE_PATH,
  withCredentials: true,
});

export async function getCall<T>(
  url: string,
  params?: any,
): Promise<ApiResponse<T>> {
  return await client
    .get(url, { params })
    .then((res) => {
      return {
        state: 'SUCCESS' as ApiResponseState,
        status: res.status,
        data: res.data as T,
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        state: 'FAILURE' as ApiResponseState,
        status: err.response.status,
        error: {
          message: err.response.data?.error?.message,
        },
      };
    });
}

export async function postCall<B, T>(
  url: string,
  body: B,
): Promise<ApiResponse<T>> {
  return await client
    .post(url, body)
    .then((res) => {
      return {
        state: 'SUCCESS' as ApiResponseState,
        status: res.status,
        data: res.data as T,
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        state: 'FAILURE' as ApiResponseState,
        status: err.response.status,
        error: {
          message: err.response.data?.error?.message,
        },
      };
    });
}

export async function putCall<B, T>(
  url: string,
  body: B,
): Promise<ApiResponse<T>> {
  return await client
    .put(url, body)
    .then((res) => {
      return {
        state: 'SUCCESS' as ApiResponseState,
        status: res.status,
        data: res.data as T,
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        state: 'FAILURE' as ApiResponseState,
        status: err.response.status,
        error: {
          message: err.response.data?.error?.message,
        },
      };
    });
}

export async function deleteCall<T>(url: string): Promise<ApiResponse<T>> {
  return await client
    .delete(url)
    .then((res) => {
      return {
        state: 'SUCCESS' as ApiResponseState,
        status: res.status,
        data: res.data as T,
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        state: 'FAILURE' as ApiResponseState,
        status: err.response.status,
        error: {
          message: err.response.data?.error?.message,
        },
      };
    });
}

export function* failureActionProceed(
  response: ApiResponse<any>,
  failureAction?: any,
  handleAuthError?: () => void,
) {
  yield failureAction && put(failureAction());

  yield put(
    addAlert({
      level: 'error',
      message:
        response.error?.message ||
        '시스템에 오류가 있습니다. 잠시 후 시도해주세요.',
      createAt: new Date(),
    }),
  );

  if (response.status === 401) {
    yield put(removeAuthentication());

    handleAuthError && handleAuthError();
  }
}
