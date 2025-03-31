import { useEffect, useState } from 'react';

import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';

import useRepayLoan from '@/hooks/loan/useRepayLoan';

type RepayLoanModalProps = {
  open: boolean;
  loanId: number;
  repayId?: number;
  onBackdrop?: () => void;
};

const MODAL_ID = 'repay_modal';

export default function RepayLoanModal({ open, loanId, repayId, onBackdrop }: RepayLoanModalProps) {
  // query
  const { onRepayLoan, isLoading } = useRepayLoan(loanId, () => {
    handleBackdrop();
  });

  // useEffect
  useEffect(() => {
    const modal = document.getElementById(MODAL_ID) as HTMLDialogElement;

    open ? modal.showModal() : modal.close();
  }, [open]);

  // handle
  const handleBackdrop = () => {
    onBackdrop && onBackdrop();
  };

  const handleKeyboardDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      handleBackdrop();
    }
  };

  // handle
  const handleRepayLoan = () => {
    repayId && onRepayLoan(repayId);
  };

  return (
    <dialog id={MODAL_ID} className="modal modal-bottom sm:modal-middle" onKeyDownCapture={handleKeyboardDown}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">금액 납부 확인</h3>
        <p className="py-4">해당 금액을 납부하실꺼임?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-error text-white" onClick={handleBackdrop}>
              <IoCloseCircleOutline className="h-6 w-6" />
              취소
            </button>

            <button className="btn btn-primary ml-3" type="button" onClick={handleRepayLoan} disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                <IoCheckmarkCircleOutline className="h-6 w-6" />
              )}
              납부 하기
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
