import { Pageable, PaginationParams } from '@/store/types';

type NoticeState = {
  isLoading: boolean;
  searchParams: PaginationParams;
  contents: Pageable<Notice>;
  detail?: Notice;
  countOfUnread: number;
};

type Notice = {
  id: string;
  title: string;
  description?: string;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastMofieidBy?: string;
  isRead: booelan;
};
