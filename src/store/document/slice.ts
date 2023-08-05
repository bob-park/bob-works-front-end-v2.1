import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { DocumentsState } from './types';

const initialState: DocumentsState = {
  isLoading: false,
  types: [],
  pageable: {
    total: 0,
    content: [],
    pageable: {
      page: 0,
      size: 0,
    },
  },
  vacationDetail: {},
  approvalList: {
    content: [],
    total: 0,
    pageable: {
      page: 0,
      size: 0,
    },
  },
};

export default createSlice({
  name: 'document',
  initialState,
  reducers,
});
