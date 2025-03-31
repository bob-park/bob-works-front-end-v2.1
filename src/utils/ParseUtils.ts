import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function getDocumentTypeId(types: DocumentTypeResponse[], typeName: DocumentsType): number {
  const type = findDocumentType(types, typeName);

  return type.id;
}

export function findDocumentType(types: DocumentTypeResponse[], typeName: DocumentsType) {
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

export function formatDate(date: Date, str: string = 'yyyy. MM. dd(EEE)') {
  return format(new Date(date), str, { locale: ko });
}

export function parseType(id: VacationType, subType?: VacationSubType) {
  if (id === 'GENERAL' && subType) {
    // return '반 차';

    switch (subType) {
      case 'AM':
        return '오 전 반 차';
      case 'PM':
        return '오 후 반 차';
      default:
        return '';
    }
  }

  let result = vacationTypes.find((item) => item.id == id)?.name;

  if (id === 'ALTERNATIVE' && subType) {
    switch (subType) {
      case 'AM':
        result += '(오 전)';
        break;
      case 'PM':
        result += '(오 후)';
        break;
      default:
        break;
    }
  }

  return result;
}

export function parseSubType(id: VacationSubType) {
  return vacationSubTypes.find((item) => item.id == id)?.name;
}

export function parsePageName(documentType: DocumentsType): string {
  switch (documentType) {
    case 'VACATION':
      return 'vacation';
    case 'HOLIDAY_WORK':
      return 'holiday';
    default:
      throw new Error('Not support documentType.');
  }
}
