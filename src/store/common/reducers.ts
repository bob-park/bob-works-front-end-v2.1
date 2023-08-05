import { PayloadAction } from '@reduxjs/toolkit';

const reducers = {
  // add alert
  addAlert: (state: CommonState, action: PayloadAction<SystemAlert>) => {
    state.alerts.push(action.payload);
  },

  // read alert
  readAlert: (state: CommonState, action: PayloadAction<number>) => {
    state.alerts.splice(action.payload, 1);
  },
};

export default reducers;
