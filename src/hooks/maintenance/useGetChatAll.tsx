import { getChatAll } from '@/entries/maintenance/api/chat';

import '@tanstack/query-core';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

const DEFAULT_SIZE = 25;

export default function useGetChatAll(roomId: string) {
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQuery<
    Page<MaintenanceCustomerChat>,
    unknown,
    InfiniteData<Page<MaintenanceCustomerChat>>,
    QueryKey,
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
    refetchInterval: 1_000,
  });

  return {
    pages: data?.pages || [],
    isLoading,
    fetchNextPage,
    reload: refetch,
  };
}
