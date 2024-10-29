import {
  addChatRoomUsers,
  createChatRoom,
  getChatRooms,
  getChats,
  getMyRoom,
} from '@/entries/chat/api';

import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useChatRoomAll(params: SearchChatRoomRequest) {
  const { data, isPending } = useQuery<ChatRoomResponse[]>({
    queryKey: ['chat', 'rooms', params],
    queryFn: () => getChatRooms(params),
  });

  return { chatRooms: data, isLoading: isPending };
}

export function useCreateChatRoom(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create', 'chat', 'room'],
    mutationFn: (body: CreateChatRoomRequest) => createChatRoom(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'rooms'] });
      onSuccess && onSuccess();
    },
  });

  return { onCreateChatRoom: mutate, isLoading: isPending };
}

export function useAddChatRoomUser() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['add', 'chat', 'room', 'user'],
    mutationFn: ({
      roomId,
      body,
    }: {
      roomId: number;
      body: AddChatRoomUserRequest;
    }) => addChatRoomUsers(roomId, body),
  });

  return { onAddChatRoomUser: mutate, isLoading: isPending };
}

export function useChats(roomId: number, params: PageParams) {
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQuery<
    Page<ChatMessageResponse>,
    unknown,
    InfiniteData<Page<ChatMessageResponse>>,
    QueryKey,
    PageParams
  >({
    queryKey: ['chat', 'room', roomId, 'messages'],
    queryFn: ({ pageParam }) => getChats(roomId, pageParam),
    initialPageParam: {
      size: 25,
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

  return {
    pages: data?.pages || [],
    isLoading,
    fetchNextPage,
    reload: refetch,
  };
}

export function useMyChatRoom() {
  const { data, isPending } = useQuery<ChatRoomResponse>({
    queryKey: ['chat', 'room', 'me'],
    queryFn: () => getMyRoom(),
  });

  return { myRoom: data, isLoading: isPending };
}
