import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { HYDRATE } from 'next-redux-wrapper';
import { MaintenanceState } from './types';

const initialState: MaintenanceState = {
  isLoading: false,
  customerChats: {
    content: [],
    total: 0,
    pageable: {
      page: 0,
      size: 0,
    },
  },
  searchCustomerChatParam: {
    page: 0,
    size: 10,
  },
};

export default createSlice({
  name: 'maintenance',
  initialState,
  reducers,
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});
