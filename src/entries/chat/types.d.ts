interface SendMessageRequest {
  room: {
    id: number;
  };
  userId: string;
  contents: string;
}

interface ChatRoomResponse {
  id: number;
  name: string;
  description?: string;
  createdDate: Date;
  lastModifiedDate?: Date;
}

interface ChatMessageResponse {
  id: number;
  room?: ChatRoomResponse;
  userId: string;
  contents: string;
  createdDate: Date;
}

type SearchChatRoomRequest = {
  userId?: string;
};

interface AddChatRoomUserRequest {
  users: {
    userId: string;
  }[];
}

interface CreateChatRoomRequest {
  name: string;
  description?: string;
  users: {
    userId: string;
  }[];
}

interface ChatRoomUserResponse {
  id: number;
  user: {
    id?: number;
    userId: string;
  };
}
