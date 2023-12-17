'use client';

// react
import { useState } from 'react';

// dayisy ui
import { Badge, Button, Join } from 'react-daisyui';

// icon
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// day of week
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

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

function EventCalendar() {
  // state
  const [nowDate, setNowDate] = useState<Date>(new Date());

  const calendarDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);

  // handler
  const handleNextMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1));
  };

  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {/* header */}
      <div></div>
      <div className="flex justify-center items-center">
        <Button className="join-item" onClick={() => handlePrevMonth()}>
          <FaAngleLeft />
        </Button>
        <strong className="text-xl w-[120px] mx-5">
          {parseHeaderDate(nowDate)}
        </strong>
        <Button className="join-item" onClick={() => handleNextMonth()}>
          <FaAngleRight />
        </Button>
      </div>
      <div className="items-center text-center">
        <Button className="" onClick={() => setNowDate(new Date())}>
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

      <div className="col-span-3 border-l border-t border-b border-gray-300">
        <div className="grid grid-cols-7 text-center text-xl font-extrabold">
          {/* day of the week */}
          {daysOfWeek.map((item, index) => (
            <div
              key={`event-calendar-days-of-week-${index}`}
              className="border-r border-gray-300"
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
                <div className="grid grid-cols-7 h-full">
                  {Array(7)
                    .fill('')
                    .map((item, daysIndex) => {
                      let isPrevMonth = false;
                      let isNextMonth = false;
                      let outputDate =
                        calendarDate.getDay() === daysIndex &&
                        calendarDate.getMonth() === nowDate.getMonth() &&
                        calendarDate.getDate();

                      const now = new Date();

                      const isNow =
                        calendarDate.getFullYear() == now.getFullYear() &&
                        calendarDate.getMonth() == now.getMonth() &&
                        calendarDate.getDate() == now.getDate();

                      if (outputDate) {
                        calendarDate.setDate(outputDate + 1);
                      } else {
                        // prev Month date
                        const prevMonthDate = new Date(calendarDate);
                        prevMonthDate.setDate(
                          calendarDate.getDate() -
                            (calendarDate.getDay() - daysIndex),
                        );

                        outputDate = prevMonthDate.getDate();
                        isPrevMonth = true;
                      }

                      return (
                        <div
                          key={`event-calendar-day-of-week-${daysIndex}`}
                          className="border-r border-gray-300"
                        >
                          <div
                            className={`text-right pt-1 pr-3 ${
                              daysIndex === 0 && 'text-red-600'
                            } ${daysIndex === 6 && 'text-blue-600'}`}
                          >
                            {isNow ? (
                              <Badge
                                className="text-white"
                                color="primary"
                                size="lg"
                              >
                                {outputDate}
                              </Badge>
                            ) : (
                              <span
                                className={`${
                                  (isPrevMonth || isNextMonth) &&
                                  'text-gray-300'
                                }`}
                              >
                                {outputDate}
                              </span>
                            )}
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
