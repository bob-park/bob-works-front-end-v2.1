import { repayLoan } from '@/entries/loan/api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRepayLoan(loanId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['loan'],
    mutationFn: (repayId: number) => repayLoan(repayId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loan', loanId] });

      onSuccess && onSuccess();
    },
  });

  return { onRepayLoan: mutate, isLoading: isPending };
}
