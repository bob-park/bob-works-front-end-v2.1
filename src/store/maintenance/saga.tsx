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

import { maintenanceActions } from '.';

const {} = maintenanceActions;

export default function* maintenanceSagas() {
  yield all([]);
}
