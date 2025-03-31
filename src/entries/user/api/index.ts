import api from '@/entries';

export async function getUser() {
  return await api.get('/api/user').json<User>();
}

export async function getUsableAlternativeVacation() {
  return await api.get('/api/user/alternative/vacation/usable').json<AlternativeVacation[]>();
}

export async function updateUserAvatar(formData: FormData) {
  return await api.post('/api/user/avatar', { body: formData }).json<User>();
}

export async function updateSignature(id: number, formData: FormData) {
  return await api.post(`/api/user/${id}/document/signature`, { body: formData }).json<User>();
}

export async function getAllUser() {
  return await api.get('/api/user/all').json<User[]>();
}

export async function updatePassword(changePassword: string) {
  return await api
    .put(`/api/user/password`, {
      json: {
        password: changePassword,
      },
    })
    .json<User>();
}
