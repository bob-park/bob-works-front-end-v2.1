import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/store';
import { NoticeState } from './types';

const selectorAllState = createSelector(
  (state: NoticeState) => state.isLoading,
  (state: NoticeState) => state.contents,
  (isLoading, contents) => ({
    isLoading,
    contents,
  }),
);

export const noticeSelector = {
  all: (state: RootState) => selectorAllState(state[NOTICE]),
};

export const NOTICE = slice.name;
export const noticeReducer = slice.reducer;
export const noticeActions = slice.actions;
