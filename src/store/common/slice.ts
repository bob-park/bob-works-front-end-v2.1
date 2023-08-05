import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: CommonState = {
  alerts: [],
};

export default createSlice({
  name: 'common',
  initialState,
  reducers,
});
