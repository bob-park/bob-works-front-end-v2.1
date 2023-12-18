'use client';

import { useEffect, useState } from 'react';

// daisyui
import { Stats } from 'react-daisyui';

import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';

import { userActions } from '@/store/user';
import EventCalendar, {
  CalendarEvent,
} from '@/components/calendar/EventCalendar';
import { documentActions } from '@/store/document';

import { formatISO, parse } from 'date-fns';
import { VacationSubType, VacationType } from '@/store/document/types';

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

// use action
const { requestGetUser } = userActions;

// document action
const { requestSearchVacation } = documentActions;

function formatDate(date: Date) {
  return formatISO(date, { representation: 'date' });
}

function parseDate(input: string): Date {
  return parse(input, 'yyyy-MM-dd', new Date());
}

function parseVacationType(
  type: VacationType,
  subType: VacationSubType | undefined,
): string {
  if (subType) {
    let type = '';

    switch (subType) {
      case 'AM':
        type = '오전';
        break;
      case 'PM':
        type = '오후';
        break;
    }

    return `반차(${type})`;
  }

  return '연차';
}

export default function DabashBoard() {
  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { vacationDocuments } = useAppSelector((state) => state.document);

  // state
  const [searchVactionParams, setSearchVacationParams] =
    useState<SearchVacationParams>(initializeDate);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // useEffect
  useEffect(() => {
    dispatch(requestGetUser({}));
  }, []);

  useEffect(() => {
    handleSearchVacation();
  }, [searchVactionParams]);

  useEffect(() => {
    setCalendarEvents(
      vacationDocuments.content
        .filter((item) => item.writer.id === user?.id)
        .map((item) => {
          return {
            name: `${user?.name}${user?.position?.name} ${parseVacationType(
              item.vacationType,
              item.vacationSubType,
            )}`,
            startDate: parseDate(item.vacationDateFrom as string),
            endDate: parseDate(item.vacationDateTo as string),
          };
        }),
    );
  }, [vacationDocuments]);

  const generalVacation = {
    total: user?.nowVacation?.general.totalCount || 0,
    used: user?.nowVacation?.general.usedCount || 0,
  };

  const alternativeVacation = {
    total: user?.nowVacation?.alternative.totalCount || 0,
    used: user?.nowVacation?.alternative.usedCount || 0,
  };

  // handler
  const handleSearchVacation = () => {
    dispatch(
      requestSearchVacation({
        startDate: formatDate(searchVactionParams.startDate),
        endDate: formatDate(searchVactionParams.endDate),
      }),
    );
  };

  const handlePrevMonth = () => {
    setSearchVacationParams({
      startDate: new Date(
        searchVactionParams.startDate.getFullYear(),
        searchVactionParams.startDate.getMonth() - 1,
        1,
      ),
      endDate: new Date(
        searchVactionParams.startDate.getFullYear(),
        searchVactionParams.startDate.getMonth(),
        0,
      ),
    });
  };

  const handleNextMonth = () => {
    setSearchVacationParams({
      startDate: new Date(
        searchVactionParams.startDate.getFullYear(),
        searchVactionParams.startDate.getMonth() + 1,
        1,
      ),
      endDate: new Date(
        searchVactionParams.startDate.getFullYear(),
        searchVactionParams.startDate.getMonth() + 2,
        0,
      ),
    });
  };

  const handleToday = () => {
    setSearchVacationParams(initializeDate);
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      <Stats className="shadow font-sans" horizontal>
        <Stats.Stat className="w-48">
          <Stat.Item variant="title">연차 개수</Stat.Item>
          <Stat.Item variant="value" className="text-primary">
            {generalVacation.total}
          </Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Item variant="title">사용한 수</Stat.Item>
          <Stat.Item variant="value" className="text-secondary">
            {generalVacation.used}
          </Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Item variant="title">남은 수</Stat.Item>
          <Stat.Item variant="value">
            {generalVacation.total - generalVacation.used}
          </Stat.Item>
        </Stats.Stat>
      </Stats>
      <Stats className="shadow font-sans" horizontal>
        <Stats.Stat className="w-48">
          <Stat.Item variant="title">대체 휴가 개수</Stat.Item>
          <Stat.Item variant="value" className="text-primary">
            {alternativeVacation.total}
          </Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Item variant="title">사용한 수</Stat.Item>
          <Stat.Item variant="value" className="text-secondary">
            {alternativeVacation.used}
          </Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="w-48">
          <Stat.Item variant="title">남은 수</Stat.Item>
          <Stat.Item variant="value">
            {alternativeVacation.total - alternativeVacation.used}
          </Stat.Item>
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
