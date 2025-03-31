import {
  getAllUser,
  getUsableAlternativeVacation,
  getUser,
  updatePassword,
  updateSignature,
  updateUserAvatar,
} from '@/entries/user/api';

import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetUser() {
  const { data, isPending } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  return { user: data, isLoading: isPending };
}

export function useGetUsableAlternativeVacation() {
  const { data } = useQuery<AlternativeVacation[]>({
    queryKey: ['user', 'usable', 'alternative', 'vacation'],
    queryFn: () => getUsableAlternativeVacation(),
  });

  return { usableAlternativeVacation: data || [] };
}

export function useGetUserAll() {
  const { data, isPending } = useQuery<User[]>({
    queryKey: ['users', 'all'],
    queryFn: () => getAllUser(),
  });

  return { users: data || [], isLoading: isPending };
}

export function useUpdateAvatar() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['user', 'avatar'],
    mutationFn: (formData: FormData) => updateUserAvatar(formData),
  });

  return { onUpdateAvatar: mutate, isLoading: isPending };
}

export function useUpdateSignature() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['user', 'signature'],
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) => updateSignature(id, formData),
  });

  return { onUpdateSignature: mutate, isLoading: isPending };
}

export function useUpdatePassword() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['user', 'password', 'update'],
    mutationFn: (password: string) => updatePassword(password),
  });

  return { onUpdatePassword: mutate, isLoading: isPending };
}
