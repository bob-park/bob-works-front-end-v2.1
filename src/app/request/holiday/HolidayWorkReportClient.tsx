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
  Divider,
  Toggle,
  Tooltip,
} from 'react-daisyui';

import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { BsFileArrowUp } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// datepicker
import Datepicker from 'react-tailwindcss-datepicker';

// store
import { commonActions } from '@/store/common';
import { documentActions } from '@/store/document';
import {
  AddHolidayWorkReportRequest,
  HolidayWorkTime,
  HolidayWorkUser,
} from '@/store/document/types';
import { userActions } from '@/store/user';

// utils
import { getDocumentTypeId } from '@/utils/ParseUtils';

import TimePicker from '@/components/TimePicker';
import DocumentTable from '@/components/DocumentTable';

type SelectDate = {
  startDate: Date | null;
  endDate: Date | null;
};

type WorkUser = {
  workUserId?: number;
  workUserName: string;
  isVacation: boolean;
  isManualInput: boolean;
};

const HOLIDAY_TYPE_NAME = 'HOLIDAY_WORK';

// actions
const { addAlert } = commonActions;
const { requestGetDocumentType, requestAddHolidayWorkReport } = documentActions;
const { requestGetAllUser } = userActions;

// headers
const userHeaders = [
  {
    id: 'userId',
    value: '근무자 아이디',
  },
  {
    id: 'name',
    value: '근무자 이름',
  },
  {
    id: 'email',
    value: '근무자 이메일',
  },
  {
    id: 'position',
    value: '직급',
    parse: (input: Position) => input.name,
  },
];

export default function HolidayWorkReportClient() {
  // router
  const router = useRouter();

  // dispatch
  const dispatch = useAppDispatch();

  // store
  const { types } = useAppSelector((state) => state.document);
  const { users } = useAppSelector((state) => state.user);

  // state
  const [holidayDate, setHolidayDate] = useState<SelectDate>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [existBreakTime, setExistBreakTime] = useState<boolean>(false);
  const [selectStartTime, setSelectStartTime] = useState<string>('00:00');
  const [selectEndTime, setSelectEndTime] = useState<string>('00:00');
  const [workTimes, setWorkTimes] = useState<HolidayWorkTime[]>([]);
  const [workPurpose, setWorkPurpose] = useState<string>('');
  const [showSelectUser, setShowSelectUser] = useState<boolean>(false);
  const [isVacation, setIsVacation] = useState<boolean>(true);
  const [isManualInput, setIsManualInput] = useState<boolean>(false);
  const [workUsers, setWorkUsers] = useState<WorkUser[]>([]);
  const [selectWorkUsers, setSelectWorkUsers] = useState<number[]>([]);
  const [manualWorkUserName, setManualWorkUserName] = useState<string>('');

  // useEffect
  useEffect(() => {
    dispatch(requestGetDocumentType({}));
    dispatch(requestGetAllUser());
  }, []);

  // handle
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !holidayDate?.endDate ||
      !workPurpose ||
      workUsers.length === 0 ||
      workTimes.length === 0
    ) {
      dispatch(
        addAlert({
          level: 'warn',
          message: '항목을 모두 입력해주세요.',
          createAt: new Date(),
        }),
      );
      return;
    }

    const createWorkUsers: HolidayWorkUser[] = workUsers.map((item) => ({
      isManualInput: item.isManualInput,
      isVacation: item.isVacation,
      workUserId: item.workUserId,
      workUserName: item.workUserName,
      workDate: holidayDate.endDate,
      times: [...workTimes],
    }));

    const requestBody: AddHolidayWorkReportRequest = {
      typeId: getDocumentTypeId(types, HOLIDAY_TYPE_NAME),
      workPurpose,
      workUsers: createWorkUsers,
    };

    dispatch(
      requestAddHolidayWorkReport({
        request: requestBody,
        handleAfter: () => router.push('/document/search'),
      }),
    );
  };

  const handleAddWorkTime = () => {
    setWorkTimes((prev) => {
      const newWorkTimes = prev.slice();

      newWorkTimes.push({
        existBreakTime,
        startTime: selectStartTime,
        endTime: selectEndTime,
      });

      return newWorkTimes;
    });

    setSelectStartTime('00:00');
    setSelectEndTime('00:00');
    setExistBreakTime(false);
  };

  const handleRemoveWorkTime = (index: number) => {
    setWorkTimes((prev) => {
      const newWorkTimes = prev.slice();

      newWorkTimes.splice(index, 1);

      return newWorkTimes;
    });
  };

  const handleToggleSelectUser = (id: number, checked: boolean) => {
    const list = selectWorkUsers.slice();

    if (checked) {
      list.push(id);
    } else {
      const index = list.findIndex((item) => item === id);
      list.splice(index, 1);
    }

    setSelectWorkUsers(list);
  };

  const handleToggleSelectUserAll = (checked: boolean) => {
    setSelectWorkUsers(checked ? users.map((item) => item.id) : []);
  };

  const handleAddRagisteredWorkUser = () => {
    if (selectWorkUsers.length < 1) {
      return;
    }

    const checkUsers = users.filter((item) =>
      selectWorkUsers.some((workUser) => workUser === item.id),
    );

    setWorkUsers((prev) => {
      const newWorkUsers = prev.slice();

      const newUsers = checkUsers
        .filter((item) =>
          newWorkUsers.every((workUser) => workUser.workUserId !== item.id),
        )
        .map((checkUser) => ({
          workUserId: checkUser.id,
          workUserName: checkUser.name,
          isVacation,
          isManualInput: false,
        }));

      return newWorkUsers.concat(newUsers);
    });

    setShowSelectUser(false);
    setIsManualInput(false);
    setIsVacation(true);
    setSelectWorkUsers([]);
  };

  const handleRemoveWorkUser = (index: number) => {
    setWorkUsers((prev) => {
      const newWorkTimes = prev.slice();

      newWorkTimes.splice(index, 1);

      return newWorkTimes;
    });
  };

  const handleAddManualWorkUser = () => {
    setWorkUsers((prev) => {
      const newWorkUsers = prev.slice();

      return newWorkUsers.concat({
        workUserName: manualWorkUserName,
        isVacation,
        isManualInput: true,
      });
    });

    setShowSelectUser(false);
    // setIsManualInput(false);
    setIsVacation(true);
    setManualWorkUserName('');
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
                <div className="grid grid-cols-9 gap-2">
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
                  <div className="col-span-3 ml-2">
                    <Tooltip message="점심 시간 포함 여부 (12:00 ~ 13:00)">
                      <Form.Label title="휴계 시간 포함">
                        <Toggle
                          className="ml-1"
                          color="primary"
                          checked={existBreakTime}
                          onChange={(e) => setExistBreakTime(e.target.checked)}
                        />
                      </Form.Label>
                    </Tooltip>
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
                    className="grid grid-cols-8 gap-2 justify-items-center items-center mt-2"
                  >
                    <div className="col-span-2 text-center">
                      {workTime.startTime}
                    </div>
                    <div className="text-center">~</div>
                    <div className="col-span-2 text-center">
                      {workTime.endTime}
                    </div>
                    <div className="col-span-2">
                      {workTime.existBreakTime && (
                        <Badge color="neutral" size="md">
                          휴계시간 포함
                        </Badge>
                      )}
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
                <Button
                  type="button"
                  color="primary"
                  variant="outline"
                  onClick={() => setShowSelectUser(true)}
                >
                  추가
                </Button>
              </div>
              <div className="col-span-1"></div>

              {/* 추가된 근무자 */}
              <div className="col-span-1"></div>
              <div className="col-span-3">
                {workUsers.map((workUser, i) => (
                  <div
                    key={`workUser_${i}`}
                    className="grid grid-cols-3 gap-3 m-2 justify-items-center items-center"
                  >
                    <div className="text-lg font-bold">
                      <span>{workUser.workUserName}</span>
                    </div>
                    <div>
                      <Badge color="primary" size="lg">
                        {workUser.isVacation ? '대체 휴가' : '수당'}
                      </Badge>
                    </div>
                    <div>
                      <Button
                        type="button"
                        shape="circle"
                        color="ghost"
                        onClick={() => handleRemoveWorkUser(i)}
                      >
                        <BiSolidMinusCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* actions */}
              <div className="col-span-5">
                <div className="flex justify-end gap-5">
                  <Button className="w-52" type="button">
                    <ImCancelCircle className="w-5 h-5" />
                    취소
                  </Button>
                  <Button className="w-52" type="submit" color="primary">
                    <BsFileArrowUp className="w-5 h-5" />
                    신청
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal className="w-11/12 max-w-5xl" open={showSelectUser} backdrop>
        <Modal.Header className="font-bold">근무자 선택</Modal.Header>
        <Modal.Body className="h-[500px] overflow-auto">
          <div className="grid grid-cols-4 gap-4 ml-4 p-2">
            {/* 근무자 형태 */}
            <div className="col-span-1">
              <span className="text-md font-bold">근무자 형태</span>
            </div>
            <div className="col-span-1">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">등록 근무자</span>
                  <input
                    type="radio"
                    name="is-manual-input"
                    className="radio checked:bg-blue-500"
                    checked={!isManualInput}
                    onChange={() => setIsManualInput(false)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">수동입력</span>
                  <input
                    type="radio"
                    name="is-manual-input"
                    className="radio checked:bg-red-500"
                    checked={isManualInput}
                    onChange={() => setIsManualInput(true)}
                  />
                </label>
              </div>
            </div>
            <div className="col-span-2"></div>

            {/* 휴가 여부 */}
            <div className="col-span-1">
              <span className="text-md font-bold">휴가 여부</span>
            </div>
            <div className="col-span-1">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">대체 휴가</span>
                  <input
                    type="radio"
                    name="is-vacation"
                    className="radio checked:bg-blue-500"
                    checked={isVacation}
                    onChange={() => setIsVacation(true)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">수당</span>
                  <input
                    type="radio"
                    name="is-vacation"
                    className="radio checked:bg-red-500"
                    checked={!isVacation}
                    onChange={() => setIsVacation(false)}
                  />
                </label>
              </div>
            </div>
            <div className="col-span-2"></div>

            <div className="col-span-4">
              <Divider />
            </div>

            {/* 근무자 입력 */}
            <div className="col-span-4 max-h-[400px] overflow-auto">
              {isManualInput ? (
                <div className="grid grid-cols-5 gap-2 justify-items-center items-center m-2">
                  <div>
                    <span className="text-md font-bold">근무자 이름</span>
                  </div>
                  <div className="col-span-2">
                    <Input
                      bordered
                      color="primary"
                      placeholder="근무자 이름"
                      value={manualWorkUserName}
                      onChange={(e) => setManualWorkUserName(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="">
                  <DocumentTable
                    firstCheckbox
                    headers={userHeaders}
                    dataList={users}
                    checkedList={selectWorkUsers}
                    onChecked={handleToggleSelectUser}
                    onCheckedAll={handleToggleSelectUserAll}
                  />
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            color="ghost"
            type="button"
            variant="outline"
            onClick={() => setShowSelectUser(false)}
          >
            취소
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() =>
              isManualInput
                ? handleAddManualWorkUser()
                : handleAddRagisteredWorkUser()
            }
          >
            추가
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
