'use client';

// daisyui
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

// react icons
import { ImCancelCircle } from 'react-icons/im';
import { BsFileArrowUp } from 'react-icons/bs';

// datepicker
import Datepicker from 'react-tailwindcss-datepicker';
import DocumentTable from '@/components/DocumentTable';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { commonActions } from '@/store/common';
import { userActions } from '@/store/user';
import { documentActions } from '@/store/document';
import {
  AddVacationRequest,
  VacationSubType,
  VacationType,
} from '@/store/document/types';
import { getDocumentTypeId } from '@/utils/ParseUtils';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type VacationSelect = {
  id: string;
  name: string;
};

type VacationDate = {
  startDate: Date;
  endDate: Date;
};

const { addAlert } = commonActions;
const { requestGetUsableAlternativeVacation } = userActions;
const { requestGetDocumentType, requestAddVacationDocument } = documentActions;

const vacationTypes: VacationSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대체휴가',
  },
];

const vacationSubTypes: VacationSelect[] = [
  {
    id: 'ALL',
    name: '종일',
  },
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

const alternativeHeaderList = [
  {
    id: 'effectiveDate',
    value: '발생일',
  },
  {
    id: 'effectiveReason',
    value: '사유',
  },
  {
    id: 'effectiveCount',
    value: '개수',
  },
  {
    id: 'usedCount',
    value: '사용',
  },
];

export default function RequestVacationClient() {
  //router
  const router = useRouter();

  //state
  const [selectVacationType, setSelectVacationType] = useState<VacationSelect>(
    vacationTypes[0],
  );
  const [selectVacationSubType, setSelectVacationSubType] =
    useState<VacationSelect>(vacationSubTypes[0]);
  const [dateValue, setDateValue] = useState<VacationDate>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [reason, setReason] = useState<string>('개인 사유');
  const [openSelectAlternative, setOpenSelectAlternative] =
    useState<boolean>(false);
  const [selectAlternativeList, setSelectAlternativeList] = useState<number[]>(
    [],
  );

  // hooks
  const dispatch = useAppDispatch();
  const { alternativeVacations } = useAppSelector((state) => state.user);
  const { types, isLoading } = useAppSelector((state) => state.document);

  // useEffect
  useEffect(() => {
    dispatch(requestGetUsableAlternativeVacation({}));

    dispatch(requestGetDocumentType({}));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      selectVacationType.id === 'ALTERNATIVE' &&
      selectAlternativeList.length === 0
    ) {
      handleAddSystemAlert(
        'error',
        '대체휴가인 경우 사용 가능한 대체휴가를 선택해야합니다.',
      );
      return;
    }

    const addVacationRequest: AddVacationRequest = {
      typeId: getDocumentTypeId(types, 'VACATION'),
      vacationType: selectVacationType.id as VacationType,
      vacationSubType:
        selectVacationSubType.id !== 'ALL'
          ? (selectVacationSubType.id as VacationSubType)
          : undefined,
      vacationDateFrom: dateValue.startDate,
      vacationDateTo: dateValue.endDate,
      reason,
      useAlternativeVacationIds:
        selectVacationType.id === 'ALTERNATIVE'
          ? selectAlternativeList
          : undefined,
    };

    dispatch(
      requestAddVacationDocument({
        body: addVacationRequest,
        afterHandle: () => router.push('/document/search'),
        handleException: {},
      }),
    );
  };

  const handleAlternativeChecked = (id: number, checked: boolean) => {
    const list = selectAlternativeList.slice();

    if (checked) {
      list.push(id);
    } else {
      const index = list.findIndex((item) => item === id);
      list.splice(index, 1);
    }

    setSelectAlternativeList(list);
  };

  const handleAlternativeCheckedAll = (checked: boolean) => {
    setSelectAlternativeList(
      checked ? alternativeVacations.map((item) => item.id) : [],
    );
  };

  const handleCancel = () => {
    setSelectVacationType(vacationTypes[0]);
    setSelectVacationSubType(vacationSubTypes[0]);
    setDateValue({ startDate: new Date(), endDate: new Date() });
    setReason('개인 사유');
    setSelectAlternativeList([]);
  };

  const handleAddSystemAlert = (level: SystemAlertLevel, message: string) => {
    dispatch(
      addAlert({
        level,
        message,
        createAt: new Date(),
      }),
    );
  };

  return (
    <>
      <Card className="bg-base-100">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가 종류</span>
              </div>
              <div className="col-span-1">
                {vacationTypes.map((vacationType) => (
                  <Form.Label key={vacationType.id} title={vacationType.name}>
                    <Radio
                      color="primary"
                      name="vacationType"
                      value={vacationType.id}
                      checked={selectVacationType.id === vacationType.id}
                      onChange={(e) =>
                        setSelectVacationType(
                          vacationTypes.find(
                            (item) => item.id == e.target.value,
                          ) || vacationTypes[0],
                        )
                      }
                    />
                  </Form.Label>
                ))}
              </div>
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가 종류</span>
              </div>
              <div className="col-span-1">
                <Select
                  color="primary"
                  value={selectVacationSubType.id}
                  onChange={(e) =>
                    setSelectVacationSubType(
                      vacationSubTypes.find(
                        (item) => item.id === e.target.value,
                      ) || vacationSubTypes[0],
                    )
                  }
                >
                  <Select.Option value="ALL">종일</Select.Option>
                  <Select.Option value="AM">오전</Select.Option>
                  <Select.Option value="PM">오후</Select.Option>
                </Select>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가일</span>
              </div>
              <div className="col-span-3">
                <Datepicker
                  placeholder="날짜 선택"
                  inputClassName="input w-full input-primary input-bordered focus:outline-offset-0 z-100"
                  minDate={new Date(new Date().getFullYear(), 1, 1)}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  value={dateValue}
                  showFooter
                  onChange={(value) => setDateValue(value as VacationDate)}
                  i18n="ko"
                  configs={{
                    footer: {
                      cancel: '취소',
                      apply: '적용',
                    },
                  }}
                />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-5">
                {selectVacationType.id === 'ALTERNATIVE' && (
                  <div className="grid grid-cols-5 gap-10">
                    <div className="col-span-1 text-center pt-2">
                      <span className="">대체 휴가 선택</span>
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="outline"
                        color="primary"
                        onClick={() => setOpenSelectAlternative(true)}
                      >
                        선택
                      </Button>
                    </div>
                    <div className="col-span-3">
                      {selectAlternativeList
                        .sort((o1, o2) => {
                          const findO1 = alternativeVacations.find(
                            (i) => i.id == o1,
                          );

                          const findO2 = alternativeVacations.find(
                            (i) => i.id == o2,
                          );

                          if (!findO1 || !findO2) {
                            return 0;
                          }

                          return findO1.effectiveDate > findO2.effectiveDate
                            ? 1
                            : -1;
                        })
                        .map((item) => {
                          const findItem = alternativeVacations.find(
                            (i) => i.id == item,
                          );

                          if (!findItem) {
                            return;
                          }

                          return (
                            <Badge
                              key={`selected_alternative_${item}`}
                              className="m-1"
                              size="lg"
                              color="accent"
                            >
                              {`${findItem.effectiveDate} (${
                                findItem.effectiveCount - findItem.usedCount
                              })`}
                            </Badge>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-1 text-center pt-2">
                <span className="">사유</span>
              </div>
              <div className="col-span-3">
                <Input
                  className="w-full"
                  required
                  bordered
                  color="primary"
                  placeholder="사유"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="col-span-5">
                <div className="flex justify-end gap-5">
                  <Button className="w-52" type="button" onClick={handleCancel}>
                    <ImCancelCircle className="w-5 h-5" />
                    취소
                  </Button>
                  <Button
                    className="w-52"
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-md" />
                    ) : (
                      <BsFileArrowUp className="w-5 h-5" />
                    )}
                    신청
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal
        className="w-11/12 max-w-5xl"
        open={openSelectAlternative}
        backdrop
      >
        <Modal.Header className="font-bold">대체 휴가 선택</Modal.Header>
        <Modal.Body>
          <DocumentTable
            firstCheckbox
            headers={alternativeHeaderList}
            dataList={alternativeVacations}
            checkedList={selectAlternativeList}
            onChecked={handleAlternativeChecked}
            onCheckedAll={handleAlternativeCheckedAll}
          />
        </Modal.Body>
        <Modal.Actions>
          <Button
            color="primary"
            onClick={() => setOpenSelectAlternative(false)}
          >
            완료
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
