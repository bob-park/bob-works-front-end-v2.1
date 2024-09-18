import { getChatRooms } from '@/entries/maintenance/api/chat';

import { useInfiniteQuery } from '@tanstack/react-query';

const DEFAULT_SIZE = 25;

export default function useGetChatRoomsAll() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    Page<MaintenanceCustomerChatRoom>,
    unknown,
    MaintenanceCustomerChatRoom,
    string[],
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

  return { pages: data, isLoading, fetchNextPage };
}
