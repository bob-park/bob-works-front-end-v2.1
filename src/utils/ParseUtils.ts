import {
  DocumentType,
  DocumentsStatus,
  DocumentsType,
  VacationSubType,
  VacationType,
} from '@/store/document/types';
import { format } from 'date-fns';

export function getDocumentTypeId(
  types: DocumentsType[],
  typeName: DocumentType,
): number {
  const type = findDocumentType(types, typeName);

  return type.id;
}

export function findDocumentType(
  types: DocumentsType[],
  typeName: DocumentType,
) {
  const type = types.find((type) => type.type === typeName);

  if (!type) {
    throw new Error('No exist type.');
  }

  return type;
}

export function parseDocumentType(typeId: string) {
  let result = typeId;
  switch (typeId) {
    case 'VACATION':
      result = '휴가계';
      break;
    case 'HOLIDAY_WORK':
      result = '휴일 근무 보고서';
      break;
    default:
      break;
  }

  return result;
}

export function parseDocumentStatus(status: DocumentsStatus) {
  switch (status) {
    case 'WAITING':
      return '대기';
    case 'PROCEEDING':
      return '진행';
    case 'APPROVE':
      return '승인';
    case 'REJECT':
      return '반려';
    case 'CANCEL':
      return '취소';
  }
}

const vacationTypes = [
  {
    id: 'GENERAL',
    name: '연 차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대 체 휴 가',
  },
];

const vacationSubTypes = [
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

export function formatDate(date: Date, str: string = 'yyyy. MM. dd.') {
  return format(new Date(date), str);
}

export function parseType(id: VacationType, isHalf: boolean) {
  if (id === 'GENERAL' && isHalf) {
    return '반 차';
  }

  return vacationTypes.find((item) => item.id == id)?.name;
}

export function parseSubType(id: VacationSubType) {
  return vacationSubTypes.find((item) => item.id == id)?.name;
}

export function parsePageName(documentType: DocumentType): string {
  switch (documentType) {
    case 'VACATION':
      return 'vacation';
    case 'HOLIDAY_WORK':
      return 'holiday';
    default:
      throw new Error('Not support documentType.');
  }
}
