import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { HYDRATE } from 'next-redux-wrapper';
import { NoticeState } from './types';

const initialState: NoticeState = {
  isLoading: false,
  countOfUnread: 0,
  searchParams: {
    page: 0,
    size: 10,
  },
  contents: {
    content: [],
    total: 0,
    pageable: {
      page: 0,
      size: 0,
    },
  },
};

export default createSlice({
  name: 'notice',
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
