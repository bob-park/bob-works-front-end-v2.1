import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle, Pageable, PaginationParams } from '@/store/types';
import { Notice, NoticeState } from './types';

const reducers = {
  // search
  requestSearchNotice: (
    state: NoticeState,
    action: PayloadAction<{
      params: PaginationParams;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    const { params } = action.payload;

    state.isLoading = true;
    state.searchParams = params;
  },
  successSearchNotice: (
    state: NoticeState,
    action: PayloadAction<Pageable<Notice>>,
  ) => {
    state.isLoading = false;
    state.contents = action.payload;
  },
  failureSearchNotice: (state: NoticeState) => {
    state.isLoading = false;
  },
  // count of unread
  requestCountOfUnread: (
    state: NoticeState,
    action: PayloadAction<{
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successCountOfUnread: (
    state: NoticeState,
    action: PayloadAction<{ count: number }>,
  ) => {
    const { count } = action.payload;

    state.isLoading = false;
    state.countOfUnread = count;
  },
  failureCountOfUnread: (state: NoticeState) => {
    state.isLoading = false;
  },
  // read notice
  requestReadNotice: (
    state: NoticeState,
    action: PayloadAction<{ id: string; exceptionHandle: ExceptionHandle }>,
  ) => {
    state.isLoading = true;
  },
  successReadNotice: (
    state: NoticeState,
    action: PayloadAction<{ id: string }>,
  ) => {
    const { id } = action.payload;

    const index = state.contents.content.findIndex((item) => item.id === id);

    if (index >= 0) {
      const readNotice = state.contents.content[index];

      if (!readNotice.isRead) {
        state.countOfUnread -= 1;
      }

      state.contents.content[index] = {
        ...readNotice,
        isRead: true,
      };
    }

    state.isLoading = false;
  },
  failureReadNotice: (state: NoticeState) => {
    state.isLoading = false;
  },
  // get notice
  requestGetNotice: (
    state: NoticeState,
    action: PayloadAction<{
      id: string;
      exceptionHandle: ExceptionHandle;
      handleAfter?: () => void;
    }>,
  ) => {
    state.isLoading = true;
  },
  successGetNotice: (
    state: NoticeState,
    action: PayloadAction<Notice | undefined>,
  ) => {
    state.isLoading = false;
    state.detail = action.payload;
  },
  failureGetNotice: (state: NoticeState) => {
    state.isLoading = false;
  },
};

export default reducers;
