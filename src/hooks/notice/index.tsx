import {
  countUnread,
  getNotice,
  read,
  searchNotice,
} from '@/entries/notice/api';

import { useMutation, useQuery } from '@tanstack/react-query';

export function useSearchNotice(params: PageParams) {
  const { data, isPending } = useQuery<Page<Notice>>({
    queryKey: ['notices', params],
    queryFn: () => searchNotice(params),
  });

  return {
    notices: data || { content: [], total: 0, pageable: { page: 0, size: 10 } },
    isLoading: isPending,
  };
}

export function useCountUnread() {
  const { data, isPending } = useQuery<{ count: number }>({
    queryKey: ['notices', 'unread'],
    queryFn: () => countUnread(),
  });

  return { count: data?.count || 0, isLoading: isPending };
}

export function useRead() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['notice', 'read'],
    mutationFn: (id: string) => read(id),
  });

  return { onRead: mutate, isLoading: isPending };
}

export function useGetNotice(id: string) {
  const { data, isPending } = useQuery<Notice>({
    queryKey: ['notices', 'unread'],
    queryFn: () => getNotice(id),
  });

  return { notice: data, isLoading: isPending };
}
