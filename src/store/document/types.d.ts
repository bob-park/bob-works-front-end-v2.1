import { Pageable } from '@/store/types';

export type DocumentType = 'VACATION' | 'HOLIDAY_WORK';

export type DocumentsState = {
  isLoading: boolean;
  types: DocumentsType[];
  // document search params
  searchParams: {
    page: number;
    size: number;
  };
  pageable: Pageable<Documents>;
  vacationDetail: VacationDocumentDetail;

  // approval search params
  approvalSearchParams: {
    page: number;
    size: number;
  };
  approvalList: Pageable<DocumentApproval>;
  approvalDetail?: DocumentApproval;
  holidayWorkReportDetail: HolidayWorkReportDetail;
  vacationDocuments: Pageable<VacationDocument>;
};

export type DocumentsType = {
  id: number;
  type: DocumentType;
  name: string;
};

// documents
export type DocumentsStatus =
  | 'WAITING'
  | 'PROCEEDING'
  | 'APPROVE'
  | 'REJECT'
  | 'CANCEL';
export type Documents = {
  id: number;
  documentType: DocumentsType;
  writer: User;
  status: DocumentsStatus;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
};
export type DocumentApproval = {
  id: nubmer;
  document: Documents;
  status: DocumentsStatus;
  approvedDateTime?: Date;
  reason?: string;
};
export type DocumentApprovalLine = {
  id: number;
  uniqueUserId: number;
  userId: string;
  username: string;
  positionId: number;
  positionName: string;
  status: DocumentsStatus;
  approvedDateTime?: Date;
  reason?: string;
};

// add vacation request
export type VacationType = 'GENERAL' | 'ALTERNATIVE';
export type VacationSubType = 'AM' | 'PM';
export type AddVacationRequest = {
  typeId: number;
  vacationType: VacationType;
  vacationSubType?: VacationSubType | null;
  vacationDateFrom: Date | string;
  vacationDateTo: Date | string;
  reason: string;
  useAlternativeVacationIds?: number[];
};

export type VacationDocument = {
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date | string;
  vacationDateTo: Date | string;
  daysCount: number;
  reason: string;
  approvals: DocumentApproval[];
} & Documents;

export type VacationDocumentDetail = {
  document?: VacationDocument;
  lines?: DocumentApprovalLine[];
  useAlternativeVacations?: AlternativeVacation[];
};

export type HolidayWorkTime = {
  existBreakTime: boolean;
  startTime: string;
  endTime: string;
};

export type HolidayWorkUser = {
  id?: number;
  isManualInput: boolean;
  workUserId?: number;
  workUserName: string;
  workDate: Date | null;
  isVacation: boolean;
  times: HolidayWorkTime[];
  totalWorkTime?: number;
  paymentTime?: number;
};

export type AddHolidayWorkReportRequest = {
  typeId: number;
  workPurpose: string;
  workUsers: HolidayWorkUser[];
};

export type HolidayWorkReport = {
  workPurpose: string;
  users: HolidayWorkUser[];
} & Documents;

export type HolidayWorkReportDetail = {
  document?: HolidayWorkReport;
  lines?: DocumentApprovalLine[];
};
