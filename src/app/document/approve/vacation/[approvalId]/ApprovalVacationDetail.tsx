'use client';

// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

import { IoChevronBackSharp } from 'react-icons/io5';

// daisyui
import { Button, Modal, Input } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';
import { DocumentsStatus } from '@/store/document/types';

import VacationDocument from '@/components/document/VacationDocument';

// actions
const {
  requestApprovalDocument,
  requestGetVacationDocument,
  requestProceedApprovalDocument,
} = documentActions;

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

  // store
  const dispatch = useAppDispatch();
  const { vacationDetail, approvalDetail } = useAppSelector(
    (state) => state.document,
  );

  // useState
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  const [rejectReason, setRejectReason] = useState<string>('');

  // useEffect
  useEffect(() => {
    dispatch(
      requestApprovalDocument({
        approvalId: Number(approvalId),
        exceptionHandle: {},
      }),
    );
  }, []);

  useEffect(() => {
    if (!approvalDetail) {
      return;
    }

    dispatch(
      requestGetVacationDocument({
        id: approvalDetail.document.id,
        exceptionHandle: {},
      }),
    );
  }, [approvalDetail]);

  const handleReject = () => {
    if (!approvalDetail) {
      return;
    }

    handleProceedApprove(approvalDetail.id, 'REJECT', rejectReason);

    setOpenRejectModal(false);
  };

  const handleApprove = () => {
    if (!approvalDetail) {
      return;
    }

    handleProceedApprove(approvalDetail.id, 'APPROVE');

    setOpenApproveModal(false);
  };

  const handleProceedApprove = (
    approvalId: number,
    status: DocumentsStatus,
    reason?: string,
  ) => {
    dispatch(
      requestProceedApprovalDocument({
        approvalId,
        body: {
          status,
          reason,
        },
        afterHandle: () => {
          router.push('/document/approve/search');
        },
        exceptionHandle: {},
      }),
    );
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-10 mt-3 justify-end">
          <Button
            color="error"
            disabled={checkDisabledBtn(approvalDetail?.status)}
            onClick={() => setOpenRejectModal(true)}
          >
            반려
          </Button>
          <Button
            color="primary"
            disabled={checkDisabledBtn(approvalDetail?.status)}
            onClick={() => setOpenApproveModal(true)}
          >
            승인
          </Button>
        </div>
      </div>

      {/* contents */}
      {vacationDetail && (
        <div className="bg-base-100 shadow-lg overflow-auto border rounded-xl">
          <VacationDocument
            document={vacationDetail.document}
            lines={vacationDetail.lines}
            useAlternativeVacations={vacationDetail.useAlternativeVacations}
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
