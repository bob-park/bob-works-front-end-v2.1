import api from '@/entries';

export async function getChatRooms(params: SearchChatRoomRequest) {
  return await api
    .get('/api/chat/room/all', { searchParams: params })
    .json<ChatRoomResponse[]>();
}

export async function createChatRoom(body: CreateChatRoomRequest) {
  return await api
    .post('/api/chat/room', {
      json: body,
    })
    .json<ChatRoomResponse>();
}

export async function addChatRoomUsers(
  roomId: number,
  body: AddChatRoomUserRequest,
) {
  return await api
    .post(`/api/chat/room/${roomId}/users`, { json: body })
    .json<ChatRoomUserResponse[]>();
}

export async function getChats(roomId: number, params: PageParams) {
  return await api
    .get(`/api/chat/room/${roomId}/chats`, {
      searchParams: params,
    })
    .json<Page<ChatMessageResponse>>();
}
