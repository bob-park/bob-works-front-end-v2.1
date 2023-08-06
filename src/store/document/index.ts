import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/rootStore';
import { DocumentsState } from './types';

const selectorAllState = createSelector(
  (state: DocumentsState) => state.isLoading,
  (state: DocumentsState) => state.types,
  (isLoading, types) => ({
    isLoading,
    types,
  }),
);

export const documentSelector = {
  all: (state: RootState) => selectorAllState(state[DOCUMENT]),
};

export const DOCUMENT = slice.name;
export const documentReducer = slice.reducer;
export const documentActions = slice.actions;
