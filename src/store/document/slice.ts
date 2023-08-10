import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { DocumentsState } from './types';

const initialState: DocumentsState = {
  isLoading: false,
  types: [],
  searchParams: {
    size: 10,
    page: 0,
  },
  pageable: {
    total: 0,
    content: [],
    pageable: {
      page: 0,
      size: 0,
    },
  },
  vacationDetail: {},
  approvalSearchParams: {
    page: 0,
    size: 10,
  },
  approvalList: {
    content: [],
    total: 0,
    pageable: {
      page: 0,
      size: 0,
    },
  },
  holidayWorkReportDetail: {},
};

export default createSlice({
  name: 'document',
  initialState,
  reducers,
});
