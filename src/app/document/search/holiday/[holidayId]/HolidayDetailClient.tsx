'use client';

import { useEffect, useState } from 'react';

import { FiPrinter, FiDownload } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

// daisyui
import { Button, Modal } from 'react-daisyui';

import { useRouter } from 'next/navigation';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

import { documentActions } from '@/store/document';
import { DocumentsStatus } from '@/store/document/types';

// utils
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type HolidayDetailClientProps = {
  documentId: string;
};

// actions
const { requestCancelDocument } = documentActions;

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT';
}

export default function HolidayDetailClient({
  documentId,
}: HolidayDetailClientProps) {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { holidayWorkReportDetail } = useAppSelector((state) => state.document);
  const { documents, lines } = holidayWorkReportDetail;

  // state
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);
  const [loaddingPdf, setLoaddingPdf] = useState<boolean>(false);

  // handle
  const handlePrint = () => {};

  const handleCapture = () => {
    if (!documents) {
      return;
    }

    const docElement = document.getElementById('holidayWorkReport');
    if (!docElement) {
      return;
    }

    setLoaddingPdf(true);

    html2canvas(docElement).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas, 'JPEG', 0, 0, 210, 297);
      pdf.save(`휴가계_${documents.writer.name}_${documents.id}.pdf`);

      setLoaddingPdf(false);
    });
  };

  const handleCancel = () => {
    if (!documents) {
      return;
    }

    setShowConfirmCancel(false);

    dispatch(
      requestCancelDocument({
        id: documents.id,
        afterHandle: () => router.push('/document/search'),
        exceptionHandle: {},
      }),
    );
  };

  return (
    <>
      {/* buttons */}
      <div>
        <div className="grid grid-cols-3 gap-10 mt-3 justify-end">
          <Button color="accent" onClick={handlePrint} disabled>
            <FiPrinter className="mr-2 h-5 w-5" size="" />
            인쇄
          </Button>

          <Button
            onClick={handleCapture}
            disabled={checkDisabledBtn(documents?.status) || loaddingPdf}
          >
            {loaddingPdf ? (
              <span className="loading loading-spinner loading-lg" />
            ) : (
              <FiDownload className="mr-2 h-5 w-5" />
            )}
            PDF 다운로드
          </Button>

          <Button
            onClick={() => setShowConfirmCancel(true)}
            color="error"
            disabled={checkDisabledBtn(documents?.status)}
          >
            <MdOutlineCancel className="mr-2 h-5 w-5" />
            취소
          </Button>
        </div>
      </div>
      {/* 취소 modal */}
      <Modal open={showConfirmCancel}>
        <Modal.Header className="font-bold">취소 할꺼야?</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => setShowConfirmCancel(false)}>안할꺼야</Button>
          <Button color="primary" onClick={handleCancel}>
            할꺼야
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
