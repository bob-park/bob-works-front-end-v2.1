import api from '@/entries';

export async function searchNotice(params: PageParams) {
  return await api
    .get('/api/notice/search', { searchParams: params })
    .json<Page<Notice>>();
}

export async function countUnread() {
  return await api.get('/api/notice/count/unread').json<{ count: number }>();
}

export async function read(id: string) {
  return await api.put(`/api/notice/${id}/read`).json<{ id: string }>();
}

export async function getNotice(id: string) {
  return await api.get(`/api/notice/${id}`).json<Notice>();
}
