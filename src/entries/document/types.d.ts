type DocumentsType = 'VACATION' | 'HOLIDAY_WORK';
type VacationType = 'GENERAL' | 'ALTERNATIVE';
type VacationSubType = 'AM' | 'PM';

interface DocumentTypeResponse {
  id: number;
  type: string;
  name: string;
}

interface AlterVacationInfo {
  id: number;
  effectiveDate: Date;
  effectiveCount: number;
  effectiveReason: string;
  usedCount: number;
}

interface UsageVacation {
  id: number;
  type: DocumentsType;
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  daysCount: number;
  reason: String;
  alternativeVacations: AlterVacationInfo[];
}

type AddVacationRequest = {
  typeId: number;
  vacationType: VacationType;
  vacationSubType?: VacationSubType | null;
  vacationDateFrom: Date | string;
  vacationDateTo: Date | string;
  reason: string;
  useAlternativeVacationIds?: number[];
};

type Documents = {
  id: number;
  documentType: DocumentTypeResponse;
  writer: User;
  status: DocumentsStatus;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
};

type DocumentsStatus =
  | 'WAITING'
  | 'PROCEEDING'
  | 'APPROVE'
  | 'REJECT'
  | 'CANCEL';

type DocumentApproval = {
  id: nubmer;
  document: Documents;
  status: DocumentsStatus;
  approvedDateTime?: Date;
  reason?: string;
};

type DocumentApprovalLine = {
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

type VacationDocument = {
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date | string;
  vacationDateTo: Date | string;
  daysCount: number;
  reason: string;
  approvals: DocumentApproval[];
} & Documents;

type VacationDocumentDetail = {
  document?: VacationDocument;
  lines?: DocumentApprovalLine[];
  useAlternativeVacations?: AlternativeVacation[];
};

type HolidayWorkTime = {
  existBreakTime: boolean;
  startTime: string;
  endTime: string;
};

type HolidayWorkUser = {
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

type AddHolidayWorkReportRequest = {
  typeId: number;
  workPurpose: string;
  workUsers: HolidayWorkUser[];
};

type HolidayWorkReport = {
  workPurpose: string;
  users: HolidayWorkUser[];
} & Documents;

type HolidayWorkReportDetail = {
  document?: HolidayWorkReport;
  lines?: DocumentApprovalLine[];
};
