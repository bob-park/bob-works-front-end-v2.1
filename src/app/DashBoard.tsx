'use client';

import { useEffect } from 'react';

// daisyui
import { Stats } from 'react-daisyui';

import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';

import { userActions } from '@/store/user';
import EventCalendar from '@/components/calendar/EventCalendar';

const Stat = Stats.Stat;

// use action
const { requestGetUser } = userActions;

export default function DabashBoard() {
  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // useEffect
  useEffect(() => {
    dispatch(requestGetUser({}));
  }, []);

  const generalVacation = {
    total: user?.nowVacation?.general.totalCount || 0,
    used: user?.nowVacation?.general.usedCount || 0,
  };

  const alternativeVacation = {
    total: user?.nowVacation?.alternative.totalCount || 0,
    used: user?.nowVacation?.alternative.usedCount || 0,
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
        <EventCalendar />
      </div>
    </div>
  );
}
