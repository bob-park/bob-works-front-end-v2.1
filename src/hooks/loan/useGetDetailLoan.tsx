import { useQuery } from '@tanstack/react-query';

import { getDetail } from '@/entries/loan/api';

export default function useGetLoanDetail(loanId: number) {
  const { data, isLoading } = useQuery<Loan>({
    queryKey: ['loan', loanId],
    queryFn: () => getDetail(loanId),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { loan: data, isLoading };
}
