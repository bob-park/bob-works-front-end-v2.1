import { createSelector } from '@reduxjs/toolkit';
import slice from './slice';
import { RootState } from '@/store/rootStore';
import { MaintenanceState } from './types';

const selectorAllState = createSelector(
  (state: MaintenanceState) => state.isLoading,
  (state: MaintenanceState) => state.customerChats,
  (isLoading, customerChats) => ({
    isLoading,
    customerChats,
  }),
);

export const maintenanceSelector = {
  all: (state: RootState) => selectorAllState(state[MAINTENANCE]),
};

export const MAINTENANCE = slice.name;
export const maintenanceReducer = slice.reducer;
export const maintenanceActions = slice.actions;
