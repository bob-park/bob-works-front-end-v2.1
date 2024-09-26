'use client';

// react
import { useEffect, useState } from 'react';
// daisyui
import { Button, Input, Modal } from 'react-daisyui';
import { IoChevronBackSharp } from 'react-icons/io5';

// next
import { useRouter } from 'next/navigation';

import {
  useApproveDocument,
  useGetApprovalDocumentDetail,
  useGetVacationDocument,
} from '@/hooks/document/document';

import VacationDocument from '@/components/document/VacationDocument';

type ApprovalVacationDetailProps = {
  approvalId: string;
};

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT' || status === 'APPROVE';
}

export default function ApprovalVacationDetail({
  approvalId,
}: ApprovalVacationDetailProps) {
  // router
  const router = useRouter();

  // useState
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  const [rejectReason, setRejectReason] = useState<string>('');

  const { approveDocument } = useGetApprovalDocumentDetail(Number(approvalId));

  const { vacationDocuments } = useGetVacationDocument(
    approveDocument?.document?.id || -1,
  );
  const { onApprove, isLoading } = useApproveDocument(() => {
    router.push('/document/approve/search');
  });

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

  const handleProceedApprove = (
    approvalId: number,
    status: DocumentsStatus,
    reason?: string,
  ) => {
    onApprove({ id: approvalId, body: { status, reason } });
  };

  return (
    <>
      <div>
        <div className="mt-3 grid grid-cols-2 justify-end gap-10">
          <Button
            color="error"
            disabled={checkDisabledBtn(approveDocument?.status)}
            onClick={() => setOpenRejectModal(true)}
          >
            반려
          </Button>
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
      {vacationDocuments && (
        <div className="overflow-auto rounded-xl border bg-base-100 shadow-lg">
          <VacationDocument
            document={vacationDocuments.document}
            lines={vacationDocuments.lines}
            useAlternativeVacations={vacationDocuments.useAlternativeVacations}
          />
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
