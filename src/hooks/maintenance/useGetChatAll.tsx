import { getChatAll, getChatRooms } from '@/entries/maintenance/api/chat';

import { useInfiniteQuery } from '@tanstack/react-query';

const DEFAULT_SIZE = 10;

export default function useGetChatAll(roomId: string) {
  const {} = useInfiniteQuery<
    Page<MaintenanceCustomerChat>,
    unknown,
    MaintenanceCustomerChat,
    string[],
    PageParams
  >({
    queryKey: ['maintenance', 'chat', 'room', roomId],
    queryFn: ({ pageParam }) => getChatAll(roomId, pageParam),
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
}
