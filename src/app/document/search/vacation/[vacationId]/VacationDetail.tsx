'use client';

import { useState } from 'react';
// daisyui
import { Button, Modal } from 'react-daisyui';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

import { useRouter } from 'next/navigation';

import {
  useCancelDocument,
  useGetVacationDocument,
} from '@/hooks/document/document';
import useToast from '@/hooks/useToast';

// hooks
// store
import VacationDocument from '@/components/document/VacationDocument';
// utils
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

interface VacationDetailProps {
  documentId: string;
}

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT';
}

export default function VacationDetail({ documentId }: VacationDetailProps) {
  // router
  const router = useRouter();

  // toast
  const { push } = useToast();

  // state
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);
  const [loaddingPdf, setLoaddingPdf] = useState<boolean>(false);

  // query
  const { vacationDocuments } = useGetVacationDocument(Number(documentId));
  const {
    document: documents,
    lines,
    useAlternativeVacations,
  } = vacationDocuments || {};

  const { onCancel } = useCancelDocument(() => {
    setShowConfirmCancel(false);
    push('휴가계가 취소되었습니다.', 'success');
    router.refresh();
  });

  // handle
  const handlePrint = () => {};

  const handleCapture = () => {
    if (!documents) {
      return;
    }

    const docElement = document.getElementById('vacationDocument');
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

    onCancel(Number(documentId));
  };

  return (
    <>
      {/* buttons */}
      <div>
        <div className="mt-3 grid grid-cols-3 justify-end gap-10">
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
      {/* contents */}
      <div className="overflow-auto rounded-xl border bg-base-100 shadow-lg">
        <VacationDocument
          document={documents}
          lines={lines}
          useAlternativeVacations={useAlternativeVacations}
        />
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
