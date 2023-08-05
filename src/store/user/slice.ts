import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: UserState = {
  isLoading: false,
  isLoggedIn: false,
  alternativeVacations: [],
};

export default createSlice({
  name: 'user',
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
