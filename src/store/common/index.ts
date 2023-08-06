import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/rootStore';

const selectorAllState = createSelector(
  (state: CommonState) => state.alerts,
  (alerts) => ({
    alerts,
  }),
);

export const commonSelector = {
  all: (state: RootState) => selectorAllState(state[COMMON]),
};

export const COMMON = slice.name;
export const commonReducer = slice.reducer;
export const commonActions = slice.actions;
