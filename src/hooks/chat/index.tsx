import {
  addChatRoomUsers,
  createChatRoom,
  getChatRooms,
} from '@/entries/chat/api';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
