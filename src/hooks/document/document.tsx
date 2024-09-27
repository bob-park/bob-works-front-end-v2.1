import {
  addHolidayWorkReport,
  addVacationDocument,
  approvalDocument,
  approveDocument,
  cancelDocument,
  getApproveDocument,
  getDocumentType,
  getHolidayWorkReports,
  getVacation,
  getVacationDocument,
  searchDocument,
} from '@/entries/document/api';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetDocumentType() {
  const { data, isPending } = useQuery<DocumentTypeResponse[]>({
    queryKey: ['documents', 'types'],
    queryFn: () => getDocumentType(),
  });

  return { documentsTypes: data || [], isLoading: isPending };
}

export function useSearchDocument(params: PageParams) {
  const { data, isPending } = useQuery<Page<Documents>>({
    queryKey: ['documents', params],
    queryFn: () => searchDocument(params),
  });

  return {
    documents: data || {
      content: [],
      total: 0,
      pageable: { page: 0, size: 10 },
    },
    isLoading: isPending,
  };
}

export function useGetVacationDocument(id: number) {
  const { data, isPending } = useQuery<VacationDocumentDetail>({
    queryKey: ['documents', id],
    queryFn: () => getVacationDocument(id),
  });

  return { vacationDocuments: data, isLoading: isPending };
}

export function useGetApprovalDocument(params: PageParams) {
  const { data, isPending } = useQuery<Page<DocumentApproval>>({
    queryKey: ['documents', 'approvals', params],
    queryFn: () => approvalDocument(params),
  });

  return {
    approvalDocuments: data || {
      content: [],
      total: 0,
      pageable: { page: 0, size: 10 },
    },
    isLoading: isPending,
  };
}

export function useApproveDocument(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['documents', 'approve'],
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: { status: DocumentsStatus; reason?: string };
    }) => approveDocument(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      onSuccess && onSuccess();
    },
  });

  return { onApprove: mutate, isLoading: isPending };
}

export function useAddHolidayWorkReport(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['documents', 'holiday'],
    mutationFn: (body: AddHolidayWorkReportRequest) =>
      addHolidayWorkReport(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      onSuccess && onSuccess();
    },
  });

  return { onAddReport: mutate, isLoading: isPending };
}

export function useGetHolidayWorkReports(documentId: number) {
  const { data, isPending } = useQuery<HolidayWorkReportDetail>({
    queryKey: ['documents', 'holiday', documentId],
    queryFn: () => getHolidayWorkReports(documentId),
  });

  return { workReport: data, isLoading: isPending };
}

export function useGetVacation(params: { startDate: string; endDate: string }) {
  const { data, isPending } = useQuery<Page<VacationDocument>>({
    queryKey: ['documents', `vacations`, params],
    queryFn: () => getVacation(params),
  });

  return { vacations: data || { content: [], total: 0 }, isLoading: isPending };
}

export function useCancelDocument(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['documents', 'cancel'],
    mutationFn: (id: number) => cancelDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      onSuccess && onSuccess();
    },
  });

  return { onCancel: mutate, isLoading: isPending };
}

export function useGetApprovalDocumentDetail(approvalId: number) {
  const { data, isPending } = useQuery<DocumentApproval>({
    queryKey: ['documents', 'approvals', approvalId],
    queryFn: () => getApproveDocument(approvalId),
  });

  return { approveDocument: data, isLoading: isPending };
}

export function useAddVacation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['documents', 'add', 'vacation'],
    mutationFn: (body: AddVacationRequest) => addVacationDocument(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      onSuccess && onSuccess();
    },
  });

  return { onAddVacation: mutate, isLoading: isPending };
}
