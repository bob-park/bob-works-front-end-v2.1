import { useQuery } from '@tanstack/react-query';

import { getAll } from '@/entries/loan/api';

export default function useGetAllLoan() {
  const { data, isLoading } = useQuery<Loan[]>({
    queryKey: ['loans'],
    queryFn: getAll,
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return {
    loans: data || [],
    isLoading,
  };
}
