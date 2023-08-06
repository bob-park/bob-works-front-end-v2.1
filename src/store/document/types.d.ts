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
export type VacationType = 'GENERAL' | 'HOLIDAY_WORK';
export type VacationSubType = 'AM' | 'PM';
export type AddVacationRequest = {
  typeId: number;
  vacationType: VacationType;
  vacationSubType?: VacationSubType | null;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  reason: string;
  useAlternativeVacationIds?: number[];
};

export type VacationDocument = {
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  daysCount: number;
  reason: string;
  approvals: DocumentApproval[];
} & Documents;

export type VacationDocumentDetail = {
  document?: VacationDocument;
  lines?: DocumentApprovalLine[];
  useAlternativeVacations?: AlternativeVacation[];
};
