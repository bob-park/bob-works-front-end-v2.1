import { getUsage } from '@/entries/document/api';
import { useQuery } from '@tanstack/react-query';

export default function useGetVacationUsage() {
  const { data, isLoading } = useQuery<UsageVacation[]>({
    queryKey: ['document', 'vacation', 'usage'],
    queryFn: () => getUsage(),
    staleTime: 60 * 1_000,
    gcTime: 120 * 1_000,
  });

  return { usageVacations: data, isLoading };
}
