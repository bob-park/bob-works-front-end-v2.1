'use client';

// react
import { useState } from 'react';

// icon
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// dayisy ui
import { Badge, Button, Join } from 'react-daisyui';

// day of week
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export type CalendarEvent = {
  startDate: Date;
  endDate: Date;
  name: string;
};

type EventCalendarProps = {
  events: CalendarEvent[];
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
};

const now = new Date();

function parseHeaderDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

function getTotalWeekNumber(date: Date): number {
  let count = 5;

  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  if (startDate.getDay() > 4 && endDate.getDate() >= 30) {
    count++;
  }

  return count;
}

function EventCalendar({ events, onPrev, onNext, onToday }: EventCalendarProps) {
  // state
  const [nowDate, setNowDate] = useState<Date>(new Date());

  const calendarDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);

  // handler
  const handleNextMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1));

    onNext && onNext();
  };

  const handlePrevMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1));

    onPrev && onPrev();
  };

  const handleToday = () => {
    setNowDate(new Date());

    onToday && onToday();
  };

  return (
    <div className="grid w-full grid-cols-3 gap-10">
      {/* header */}
      <div></div>
      <div className="flex items-center justify-center">
        <Button className="join-item" onClick={handlePrevMonth}>
          <FaAngleLeft />
        </Button>
        <strong className="mx-5 w-[120px] text-xl">{parseHeaderDate(nowDate)}</strong>
        <Button className="join-item" onClick={handleNextMonth}>
          <FaAngleRight />
        </Button>
      </div>
      <div className="items-center text-center">
        <Button className="" onClick={handleToday}>
          오늘
        </Button>
        <Join className="ml-5">
          <Button className="join-item" active>
            월
          </Button>
          <Button className="join-item">주</Button>
          <Button className="join-item">일</Button>
        </Join>
      </div>
      {/* contents */}

      <div className="col-span-3 border-b border-l border-t border-gray-300">
        <div className="grid grid-cols-7 text-center text-xl font-extrabold">
          {/* day of the week */}
          {daysOfWeek.map((item, index) => (
            <div
              key={`event-calendar-days-of-week-${index}`}
              className={`border-r border-gray-300 ${
                index === 0 && 'text-red-600'
              } ${index === daysOfWeek.length - 1 && 'text-blue-600'}`}
            >
              {item}
            </div>
          ))}

          {/* calender */}
          {Array(getTotalWeekNumber(nowDate))
            .fill('')
            .map((item, weekIndex) => (
              <div
                key={`event-calendar-week-${weekIndex}`}
                className="col-span-7 h-32 border-t border-gray-300 text-lg font-semibold"
              >
                <div className="grid h-full grid-cols-7">
                  {Array(7)
                    .fill('')
                    .map((item, daysIndex) => {
                      let tempDate = new Date(calendarDate.getTime());

                      let isPrevMonth = false;
                      let isNextMonth = false;
                      let outputDate =
                        calendarDate.getDay() === daysIndex &&
                        calendarDate.getMonth() === nowDate.getMonth() &&
                        calendarDate.getDate();

                      const isNow =
                        calendarDate.getFullYear() == now.getFullYear() &&
                        calendarDate.getMonth() == now.getMonth() &&
                        calendarDate.getDate() == now.getDate();

                      if (outputDate) {
                        calendarDate.setDate(outputDate + 1);
                      } else {
                        // prev Month date
                        const prevMonthDate = new Date(calendarDate);
                        prevMonthDate.setDate(calendarDate.getDate() - (calendarDate.getDay() - daysIndex));

                        outputDate = prevMonthDate.getDate();
                        tempDate = prevMonthDate;
                        isPrevMonth = true;
                      }

                      return (
                        <div
                          key={`event-calendar-day-of-week-${daysIndex}`}
                          className="h-full border-r border-gray-300"
                        >
                          <div
                            className={`pr-3 pt-1 text-right ${
                              daysIndex === 0 && 'text-red-600'
                            } ${daysIndex === 6 && 'text-blue-600'}`}
                          >
                            {isNow ? (
                              <Badge className="text-white" color="primary" size="lg">
                                {outputDate}
                              </Badge>
                            ) : (
                              <span className={`${(isPrevMonth || isNextMonth) && 'text-gray-300'}`}>{outputDate}</span>
                            )}
                          </div>
                          <div className="h-24 overflow-auto text-left text-xs">
                            {events
                              .filter(
                                (event) =>
                                  tempDate.getTime() >= event.startDate.getTime() &&
                                  tempDate.getTime() <= event.endDate.getTime(),
                              )
                              .map((event) => (
                                <div
                                  key={`calender-event_date_${tempDate}`}
                                  className={`mx-1 mb-1 rounded-xl border border-blue-500 bg-blue-500 pl-2 text-white`}
                                >
                                  {event.name}
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
