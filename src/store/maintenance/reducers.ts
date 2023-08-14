import { PayloadAction } from '@reduxjs/toolkit';
import { CustomerChat, CustomerChatRoom, MaintenanceState } from './types';
import { Pageable, PaginationParams } from '@/store/types';

const reducers = {
  // get customer chat room
  requestGetLatestCustomerChatRoom: (state: MaintenanceState) => {
    state.isLoading = true;
  },
  successGetLatestCustomerChatRoom: (
    state: MaintenanceState,
    action: PayloadAction<CustomerChatRoom | undefined>,
  ) => {
    state.isLoading = false;
    state.customerChatRoom = action.payload;
  },
  failureGetLatestCustomerChatRoom: (state: MaintenanceState) => {
    state.isLoading = false;
  },
  // create customer chat room
  requestCreateCustomerChatRoom: (
    state: MaintenanceState,
    action: PayloadAction<{ title: string }>,
  ) => {
    state.isLoading = true;
  },
  successCreateCustomerChatRoom: (
    state: MaintenanceState,
    action: PayloadAction<CustomerChatRoom | undefined>,
  ) => {
    state.isLoading = false;
    state.customerChatRoom = action.payload;
  },
  failureCreateCustomerChatRoom: (state: MaintenanceState) => {
    state.isLoading = false;
  },
  // get customer chat list
  requestGetCustomerChatList: (
    state: MaintenanceState,
    action: PayloadAction<{ roomId: string } & PaginationParams>,
  ) => {
    state.isLoading = true;
    state.searchCustomerChatParam = action.payload;
  },
  successGetCustomerChatList: (
    state: MaintenanceState,
    action: PayloadAction<Pageable<CustomerChat> | undefined>,
  ) => {
    state.isLoading = false;
    state.customerChats = action.payload || {
      content: [],
      total: 0,
      pageable: {
        page: 0,
        size: 0,
      },
    };
  },
  failureGetCustomerChatList: (state: MaintenanceState) => {
    state.isLoading = false;
  },

  // send custmer chat
  requestSendCustomerChat: (
    state: MaintenanceState,
    action: PayloadAction<{
      roomId: string;
      userUniqueId: number;
      userId: string;
      contents: string;
    }>,
  ) => {
    state.isLoading = true;
  },
  successSendCustomerChat: (
    state: MaintenanceState,
    action: PayloadAction<
      { userUniqueId: number; userId: string } & CustomerChat
    >,
  ) => {
    state.isLoading = false;

    const { id, contents, userUniqueId, userId } = action.payload;

    state.customerChats.content.unshift({
      id,
      contents,
      writerId: userUniqueId,
      isRead: false,
      createdDate: new Date(),
      createdBy: userId,
    });
  },
  failureSendCustomerChat: (state: MaintenanceState) => {
    state.isLoading = false;
  },
};

export default reducers;
