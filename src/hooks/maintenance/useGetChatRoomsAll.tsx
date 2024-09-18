import { getChatRooms } from '@/entries/maintenance/api/chat';

import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

const DEFAULT_SIZE = 25;

export default function useGetChatRoomsAll() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    Page<MaintenanceCustomerChatRoom>,
    unknown,
    InfiniteData<Page<MaintenanceCustomerChatRoom>>,
    QueryKey,
    PageParams
  >({
    queryKey: ['maintenance', 'chat', 'rooms'],
    queryFn: ({ pageParam }) => getChatRooms(pageParam),
    initialPageParam: {
      size: DEFAULT_SIZE,
      page: 0,
    },
    getNextPageParam: (lastPage, allPages) => {
      let totalPage = Math.ceil(lastPage.total / lastPage.pageable.size);

      if (lastPage.total % lastPage.pageable.size > 0) {
        totalPage = totalPage + 1;
      }

      const page = lastPage.pageable;
      const nextPage = page.page + 1;

      return {
        ...page,
        page: page.page + 1 > totalPage ? totalPage : nextPage,
      };
    },
  });

  return { page: data, isLoading, fetchNextPage };
}
