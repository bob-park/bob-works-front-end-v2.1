import { Pageable, PaginationParams } from '@/store/types';

type MaintenanceState = {
  isLoading: boolean;
  customerChatRoom?: CustomerChatRoom;
  customerChats: Pageable<CustomerChat>;
  searchCustomerChatParam: {} & PaginationParams;
};

type CustomerChatRoom = {
  id: string;
  title: string;
};

type CustomerChat = {
  id: string;
  room?: CustomerChatRoom;
  writerId?: number;
  contents: string;
  isRead?: boolean;
  createdDate: Date;
  createdBy?: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
};
