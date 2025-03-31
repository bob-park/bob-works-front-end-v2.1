'use client';

import { useEffect, useState } from 'react';

import { useGetVacation } from '@/hooks/document/document';
import { useGetUser } from '@/hooks/user';

import EventCalendar, { CalendarEvent } from '@/components/calendar/EventCalendar';

import { formatISO, parse } from 'date-fns';
import dayjs from 'dayjs';
// daisyui
import { Stats } from 'react-daisyui';

type SearchVacationParams = {
  startDate: Date;
  endDate: Date;
};

const now = new Date();
const initializeDate = {
  startDate: new Date(now.getFullYear(), now.getMonth(), 1),
  endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0),
};

const Stat = Stats.Stat;

function formatDate(date: Date) {
  return formatISO(date, { representation: 'date' });
}

function parseDate(input: string): Date {
  return parse(input, 'yyyy-MM-dd', new Date());
}

function parseVacationType(type: VacationType, subType: VacationSubType | undefined): string {
  let vacationType: string = '';

  switch (type) {
    case 'GENERAL':
      vacationType = '연차';

      if (subType) {
        switch (subType) {
          case 'AM':
            vacationType = '반차(오전)';
            break;
          case 'PM':
            vacationType = '반차(오후)';
            break;
        }
      }
      break;

    case 'ALTERNATIVE':
      vacationType = '대체휴가';

      if (subType) {
        switch (subType) {
          case 'AM':
            vacationType += '(오전)';
            break;
          case 'PM':
            vacationType += '(오후)';
            break;
        }
      }

      break;
  }

  return vacationType;
}

export default function DabashBoard() {
  // state
  const [searchVacationParams, setSearchVacationParams] = useState<SearchVacationParams>(initializeDate);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // query
  const { user } = useGetUser();
  const { vacations } = useGetVacation({
    startDate: dayjs(searchVacationParams.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(searchVacationParams.endDate).format('YYYY-MM-DD'),
  });

  // useEffect
  useEffect(() => {}, []);

  useEffect(() => {
    handleSearchVacation();
  }, [searchVacationParams]);

  useEffect(() => {
    setCalendarEvents(
      (vacations || { content: [] }).content
        .filter((item) => item.writer.id === user?.id)
        .map((item) => {
          return {
            name: `${user?.name}${user?.position?.name} ${parseVacationType(item.vacationType, item.vacationSubType)}`,
            startDate: parseDate(item.vacationDateFrom as string),
            endDate: parseDate(item.vacationDateTo as string),
          };
        }),
    );
  }, [vacations]);

  const generalVacation = {
    total: user?.nowVacation?.general.totalCount || 0,
    used: user?.nowVacation?.general.usedCount || 0,
  };

  const alternativeVacation = {
    total: user?.nowVacation?.alternative.totalCount || 0,
    used: user?.nowVacation?.alternative.usedCount || 0,
  };

  // handler
  const handleSearchVacation = () => {};

  const handlePrevMonth = () => {
    setSearchVacationParams({
      startDate: new Date(
        searchVacationParams.startDate.getFullYear(),
        searchVacationParams.startDate.getMonth() - 1,
        1,
      ),
      endDate: new Date(searchVacationParams.startDate.getFullYear(), searchVacationParams.startDate.getMonth(), 0),
    });
  };

  const handleNextMonth = () => {
    setSearchVacationParams({
      startDate: new Date(
        searchVacationParams.startDate.getFullYear(),
        searchVacationParams.startDate.getMonth() + 1,
        1,
      ),
      endDate: new Date(searchVacationParams.startDate.getFullYear(), searchVacationParams.startDate.getMonth() + 2, 0),
    });
  };

  const handleToday = () => {
    setSearchVacationParams(initializeDate);
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <Stats className="font-sans shadow" direction="horizontal">
        <Stats.Stat className="w-48">
          <Stat.Title>연차 개수</Stat.Title>
          <Stat.Value className="text-primary">{generalVacation.total}</Stat.Value>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Title>사용한 수</Stat.Title>
          <Stat.Value className="text-secondary">{generalVacation.used}</Stat.Value>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Title>남은 수</Stat.Title>
          <Stat.Value>{generalVacation.total - generalVacation.used}</Stat.Value>
        </Stats.Stat>
      </Stats>
      <Stats className="font-sans shadow" direction="horizontal">
        <Stats.Stat className="w-48">
          <Stat.Title>대체 휴가 개수</Stat.Title>
          <Stat.Value className="text-primary">{alternativeVacation.total}</Stat.Value>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Title>사용한 수</Stat.Title>
          <Stat.Value className="text-secondary">{alternativeVacation.used}</Stat.Value>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Title>남은 수</Stat.Title>
          <Stat.Value>{alternativeVacation.total - alternativeVacation.used}</Stat.Value>
        </Stats.Stat>
      </Stats>

      <div className="w-full">
        <EventCalendar
          events={calendarEvents}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onToday={handleToday}
        />
      </div>
    </div>
  );
}
