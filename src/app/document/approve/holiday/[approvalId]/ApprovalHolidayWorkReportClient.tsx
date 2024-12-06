'use client';

// react
import { useState } from 'react';

// next
import { useRouter } from 'next/navigation';

import { useApproveDocument, useGetApprovalDocumentDetail, useGetHolidayWorkReports } from '@/hooks/document/document';

import HolidayWorkReportDocument from '@/components/document/HolidayWorkReportDocument';

interface ApprovalHolidayWorkReportClientProps {
  approvalId: string;
}

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT' || status === 'APPROVE';
}

export default function ApprovalHolidayWorkReportClient({ approvalId }: ApprovalHolidayWorkReportClientProps) {
  // router
  const router = useRouter();

  // state
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  const [rejectReason, setRejectReason] = useState<string>('');

  // query
  const { approveDocument } = useGetApprovalDocumentDetail(Number(approvalId));
  const { workReport } = useGetHolidayWorkReports(approveDocument?.document?.id || -1);
  const { onApprove } = useApproveDocument(() => {
    router.push('/document/approve/search');
  });

  // handle
  const handleReject = () => {
    if (!approveDocument) {
      return;
    }

    handleProceedApprove(approveDocument.id, 'REJECT', rejectReason);

    setOpenRejectModal(false);
  };

  const handleApprove = () => {
    if (!approveDocument) {
      return;
    }

    handleProceedApprove(approveDocument.id, 'APPROVE');

    setOpenApproveModal(false);
  };

  const handleProceedApprove = (approvalId: number, status: DocumentsStatus, reason?: string) => {
    onApprove({ id: approvalId, body: { status, reason } });
  };

  return (
    <>
      <div>
        <div className="mt-3 grid grid-cols-2 justify-end gap-10">
          <button
            type="button"
            className=""
            color="error"
            disabled={checkDisabledBtn(approveDocument?.status)}
            onClick={() => setOpenRejectModal(true)}
          >
            반려
          </button>
          <Button
            color="primary"
            disabled={checkDisabledBtn(approveDocument?.status)}
            onClick={() => setOpenApproveModal(true)}
          >
            승인
          </Button>
        </div>
      </div>

      {/* contents */}
      {workReport && (
        <div className="overflow-auto rounded-xl border bg-base-100 shadow-lg">
          <HolidayWorkReportDocument document={workReport.document} lines={workReport.lines} />
        </div>
      )}

      {/* 반려 modal */}
      <Modal open={openRejectModal}>
        <Modal.Header className="font-bold">반려</Modal.Header>
        <Modal.Body>
          <Input
            className="w-full"
            placeholder="반려 사유"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={() => setOpenRejectModal(false)}>취소</Button>
          <Button color="error" onClick={handleReject}>
            반려 처리
          </Button>
        </Modal.Actions>
      </Modal>

      {/* 승인 modal */}
      <Modal open={openApproveModal}>
        <Modal.Header className="font-bold">승인</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => setOpenApproveModal(false)}>취소</Button>
          <Button color="primary" onClick={handleApprove}>
            승인 처리
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
