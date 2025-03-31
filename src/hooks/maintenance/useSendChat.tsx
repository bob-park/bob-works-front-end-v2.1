import { sendMassage } from '@/entries/maintenance/api/chat';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSendChat(roomId: string, onSuccess?: (data: MaintenanceCustomerChat) => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['maintenance', 'chat', 'send'],
    mutationFn: (message: string) => sendMassage(roomId, message),
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
  });

  return { send: mutate, isLoading: isPending };
}
