import api from '@/entries';

export async function getUsage() {
  const response = await fetch('/api/document/vacation/usage', {
    method: 'get',
    next: {
      tags: ['document', 'vacation', 'usage'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response
    .json()
    .then((res: UsageVacation[]) => res.sort((o1, o2) => (o1.vacationDateFrom > o2.vacationDateFrom ? 1 : -1)));
}

export async function getDocumentType() {
  return await api.get('/api/document/type/search').json<DocumentTypeResponse[]>();
}

export async function addVacationDocument(body: AddVacationRequest) {
  return await api.post('/api/document/vacation', { json: body }).json<Documents>();
}

export async function searchDocument(params: PageParams) {
  return await api
    .get('/api/document/search', {
      searchParams: params,
    })
    .json<Page<Documents>>();
}

export async function getVacationDocument(id: number) {
  return await api.get(`/api/document/vacation/${id}`).json<VacationDocumentDetail>();
}
export async function approvalDocument(params: PageParams) {
  return await api.get('/api/document/approval/search', { searchParams: params }).json<Page<DocumentApproval>>();
}

export async function getApproveDocument(approvalId: number) {
  return await api.get(`/api/document/approval/${approvalId}`).json<DocumentApproval>();
}

export async function approveDocument(id: number, body: { status: DocumentsStatus; reason?: string }) {
  return await api.put(`/api/document/approval/${id}`, { json: body }).json<DocumentApproval>();
}

export async function addHolidayWorkReport(body: AddHolidayWorkReportRequest) {
  return await api.post('/api/document/holiday', { json: body }).json<HolidayWorkReport>();
}

export async function getHolidayWorkReports(documentId: number) {
  return await api.get(`/api/document/holiday/${documentId}`).json<HolidayWorkReportDetail>();
}

export async function getVacation(params: { startDate: string; endDate: string }) {
  return await api
    .get('/api/document/vacation/search', {
      searchParams: params,
    })
    .json<Page<VacationDocument>>();
}

export async function cancelDocument(documentId: number) {
  return await api.delete(`/api/document/${documentId}/cancel`).json<Documents>();
}

export async function getHolidayWorkTimeLogs(workTimeId: number) {
  return await api.get(`/api/document/holiday/work/time/${workTimeId}/logs`).json<HolidayWorkTimeLogResponse[]>();
}
