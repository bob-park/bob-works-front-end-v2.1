import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle } from '../types';

const reducers = {
  requestGetUser: (
    state: UserState,
    action: PayloadAction<{
      handleAfter?: () => void;
      exceptionHandle?: () => void;
    }>,
  ) => {
    state.isLoading = true;
    state.isLoggedIn = false;
  },
  successGetUser: (
    state: UserState,
    action: PayloadAction<User | undefined>,
  ) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.user = action.payload;
  },
  // remove authentication
  removeAuthentication: (state: UserState) => {
    state.user = undefined;
    state.isLoading = false;
    state.isLoggedIn = false;
  },

  // get alternative vacation list
  requestGetUsableAlternativeVacation: (
    state: UserState,
    action: PayloadAction<{ handleAuthException?: () => void }>,
  ) => {
    state.isLoading = true;
  },
  successGetUsableAlternativeVacation: (
    state: UserState,
    action: PayloadAction<AlternativeVacation[]>,
  ) => {
    state.isLoading = false;
    state.alternativeVacations = action.payload;
  },
  failureGetUsableAlternativeVacation: (state: UserState) => {
    state.isLoading = false;
  },

  // update avatar
  requestUpdateUserAvatar: (
    state: UserState,
    action: PayloadAction<{
      formData: FormData;
      handleAfter?: () => void;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successUpdateUserAvatar: (state: UserState) => {
    state.isLoading = false;
  },
  failureUpdateUserAvatar: (state: UserState) => {
    state.isLoading = false;
  },
  // update signature
  requestUpdateSignature: (
    state: UserState,
    action: PayloadAction<{
      id: number;
      formData: FormData;
      handleAfter?: () => void;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successUpdateSignature: (state: UserState) => {
    state.isLoading = false;
  },
  failureUpdateSignature: (state: UserState) => {
    state.isLoading = false;
  },

  // get users
  requestGetAllUser: (state: UserState) => {
    state.isLoading = true;
  },
  successGetAllUser: (state: UserState, action: PayloadAction<User[]>) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  failureGetAllUser: (state: UserState) => {
    state.isLoading = false;
  },

  // change password
  requestChangePassword: (
    state: UserState,
    action: PayloadAction<{
      userId: number;
      changePassword: string;
      handleAfter?: () => void;
    }>,
  ) => {
    state.isLoading = true;
  },
  successChangePassword: (state: UserState) => {
    state.isLoading = false;
  },
  failureChangePassword: (state: UserState) => {
    state.isLoading = false;
  },
};

export default reducers;
