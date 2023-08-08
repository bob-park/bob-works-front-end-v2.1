'use client';

import { FormEvent, useEffect, useState } from 'react';

import {
  Form,
  Radio,
  Select,
  Input,
  Button,
  Modal,
  Badge,
  Card,
} from 'react-daisyui';

import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';

import { useRouter } from 'next/navigation';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// datepicker
import Datepicker from 'react-tailwindcss-datepicker';

// store
import { documentActions } from '@/store/document';

// utils
import { getDocumentTypeId } from '@/utils/ParseUtils';
import TimePicker from '@/components/TimePicker';

type SelectDate = {
  startDate: Date | null;
  endDate: Date | null;
};

type SelectTime = {
  startTime: string;
  endTime: string;
};

const HOLIDAY_TYPE_NAME = 'HOLIDAY_WORK';

// actions
const { requestGetDocumentType } = documentActions;

export default function HolidayWorkReportClient() {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // store
  const { types } = useAppSelector((state) => state.document);

  // state
  const [holidayDate, setHolidayDate] = useState<SelectDate>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectStartTime, setSelectStartTime] = useState<string>('00:00');
  const [selectEndTime, setSelectEndTime] = useState<string>('00:00');
  const [workTimes, setWorkTimes] = useState<SelectTime[]>([]);
  const [workPurpose, setWorkPurpose] = useState<string>('');

  // useEffect
  useEffect(() => {
    dispatch(requestGetDocumentType({}));
  }, []);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddWorkTime = () => {
    setWorkTimes((prev) => {
      const newWorkTimes = prev.slice();

      newWorkTimes.push({
        startTime: selectStartTime,
        endTime: selectEndTime,
      });

      return newWorkTimes;
    });

    setSelectStartTime('00:00');
    setSelectEndTime('00:00');
  };

  const handleRemoveWorkTime = (index: number) => {
    setWorkTimes((prev) => {
      const newWorkTimes = prev.slice();

      newWorkTimes.splice(index, 1);

      return newWorkTimes;
    });
  };

  return (
    <>
      <Card className="bg-base-100">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              {/* 근무일 */}
              <div className="col-span-1 text-center pt-2">
                <span className="">근무일</span>
              </div>
              <div className="col-span-3">
                <Datepicker
                  asSingle
                  placeholder="날짜 선택"
                  inputClassName="input w-full input-primary input-bordered focus:outline-offset-0 z-100"
                  value={holidayDate}
                  i18n="ko"
                  onChange={(value) => setHolidayDate(value as SelectDate)}
                />
              </div>
              <div className="col-span-1"></div>

              {/* 근무 시간 */}
              <div className="col-span-1 text-center pt-2 ">
                <span className="">근무 시간</span>
              </div>
              <div className="col-span-3 text-center content-center pt-2">
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-2">
                    <TimePicker
                      time={selectStartTime}
                      onChange={(time) => setSelectStartTime(time)}
                    />
                  </div>
                  <div className="pt-2"> ~ </div>
                  <div className="col-span-2">
                    <TimePicker
                      time={selectEndTime}
                      onChange={(time) => setSelectEndTime(time)}
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      shape="circle"
                      color="ghost"
                      onClick={handleAddWorkTime}
                    >
                      <BiSolidPlusCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-3">
                {workTimes.map((workTime, i) => (
                  <div
                    key={`workTime_${i}`}
                    className="grid grid-cols-6 gap-2 justify-items-center items-center mt-2"
                  >
                    <div className="col-span-2 text-center">
                      {workTime.startTime}
                    </div>
                    <div className="text-center">~</div>
                    <div className="col-span-2 text-center">
                      {workTime.endTime}
                    </div>
                    <div>
                      <Button
                        type="button"
                        shape="circle"
                        color="ghost"
                        onClick={() => handleRemoveWorkTime(i)}
                      >
                        <BiSolidMinusCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-1"></div>

              {/* 근무 목적 */}
              <div className="col-span-1 text-center pt-2">
                <span className="">근무 목적</span>
              </div>
              <div className="col-span-3">
                <Input
                  className="w-full"
                  required
                  bordered
                  color="primary"
                  placeholder="근무 목적"
                  value={workPurpose}
                  onChange={(e) => setWorkPurpose(e.target.value)}
                />
              </div>
              <div className="col-span-1"></div>

              {/* 근무자 */}
              <div className="col-span-1 text-center pt-2">
                <span className="">근무자</span>
              </div>
              <div className="col-span-3 pt-2">
                <Button type="button" color="primary" variant="outline">
                  선택
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
