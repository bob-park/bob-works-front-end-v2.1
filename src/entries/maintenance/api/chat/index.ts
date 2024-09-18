import api from '@/entries';

export async function getChatRooms(page: PageParams) {
  return await api
    .get(
      `api/maintenance/customer/chat/room/all?size=${page.size}&page=${page.page}`,
    )
    .json<Page<MaintenanceCustomerChatRoom>>();
}

export async function sendMassage(roomId: string, message: string) {
  return await api
    .post(`api/maintenance/customer/chat/${roomId}`, {
      json: {
        contents: message,
      },
    })
    .json<MaintenanceCustomerChat>();
}

export async function getChatAll(roomId: string, page: PageParams) {
  return await api
    .get(
      `api/maintenance/customer/chat/${roomId}?size=${page.size}&page=${page.page}`,
    )
    .json<Page<MaintenanceCustomerChat>>();
}
