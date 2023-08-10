import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle, Pageable, PaginationParams } from '@/store/types';
import {
  AddHolidayWorkReportRequest,
  AddVacationRequest,
  DocumentApproval,
  Documents,
  DocumentsState,
  DocumentsStatus,
  DocumentsType,
  VacationDocumentDetail,
  VacationType,
} from './types';
import { ApprovalLine } from '@/components/document/ApprovalLines';

const reducers = {
  // get document type
  requestGetDocumentType: (
    state: DocumentsState,
    action: PayloadAction<ExceptionHandle>,
  ) => {
    state.isLoading = true;
  },
  successGetdocumentType: (
    state: DocumentsState,
    action: PayloadAction<DocumentsType[]>,
  ) => {
    state.isLoading = false;
    state.types = action.payload;
  },
  failureGetDocumentType: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // add vacation document
  requestAddVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      body: AddVacationRequest;
      afterHandle?: () => void;
      handleException: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successAddVacationDocumnet: (
    state: DocumentsState,
    action: PayloadAction<Documents | undefined>,
  ) => {
    state.isLoading = false;
  },
  failureAddVacationDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // search document
  requestSearchDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      params: PaginationParams;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    const { params } = action.payload;

    state.isLoading = true;
    state.searchParams = params;
  },
  successSearchDocument: (
    state: DocumentsState,
    action: PayloadAction<Pageable<Documents> | undefined>,
  ) => {
    state.isLoading = false;

    if (action.payload) {
      state.pageable = action.payload;
    }
  },
  failureSearchDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },

  // get vacation detail
  requestGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{ id: number; exceptionHandle: ExceptionHandle }>,
  ) => {
    state.isLoading = true;
  },
  successGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<VacationDocumentDetail>,
  ) => {
    state.isLoading = false;
    state.vacationDetail = action.payload;
  },
  failureGetVacationDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // cancel vacation document
  requestCancelDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      id: number;
      afterHandle?: () => void;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successCancelDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  failureCancelDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // get approval document
  requestApprovalDocuments: (
    state: DocumentsState,
    action: PayloadAction<{
      params: PaginationParams;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    const { params } = action.payload;

    state.isLoading = true;
    state.approvalSearchParams = params;
  },
  successApprovalDocuments: (
    state: DocumentsState,
    action: PayloadAction<Pageable<DocumentApproval> | undefined>,
  ) => {
    state.isLoading = false;

    if (action.payload) {
      state.approvalList = action.payload;
    }
  },
  failureApprovalDocuments: (state: DocumentsState) => {
    state.isLoading = false;
  },

  // get approval document
  requestApprovalDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      approvalId: number;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successApprovalDocument: (
    state: DocumentsState,
    action: PayloadAction<DocumentApproval | undefined>,
  ) => {
    state.isLoading = false;

    if (action.payload) {
      state.approvalDetail = action.payload;
    }
  },
  failureApprovalDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  // proceed approval document
  requestProceedApprovalDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      approvalId: number;
      body: {
        status: DocumentsStatus;
        reason?: string;
      };
      afterHandle?: () => void;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {},
  successProceedApprovalDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
  failureProceedApprovalDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },

  // add holiday work report
  requestAddHolidayWorkReport: (
    state: DocumentsState,
    action: PayloadAction<{
      request: AddHolidayWorkReportRequest;
      handleAfter: () => void;
    }>,
  ) => {
    state.isLoading = true;
  },
  successAddHolidayWorkReport: (state: DocumentsState) => {
    state.isLoading = false;
  },
  failureAddHolidayWorkReport: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
