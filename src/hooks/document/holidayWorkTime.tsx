import { getHolidayWorkTimeLogs, getUsage } from '@/entries/document/api';

import { useQuery } from '@tanstack/react-query';

export function useHolidayWorkTimeLog(workTimeId: number) {
  const { data } = useQuery<HolidayWorkTimeLogResponse[]>({
    queryKey: ['document', 'holiday', 'workTime', workTimeId, 'logs'],
    queryFn: () => getHolidayWorkTimeLogs(workTimeId),
  });

  return { logs: data || [] };
}
