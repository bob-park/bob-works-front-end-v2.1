import { useState, useEffect } from 'react';

type RepayLoanModalProps = {
  open: boolean;
  repayId?: number;
  onBackdrop?: () => void;
};

const MODAL_ID = 'repay_modal';

export default function RepayLoanModal({
  open,
  repayId,
  onBackdrop,
}: RepayLoanModalProps) {
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

  return (
    <dialog
      id={MODAL_ID}
      className="modal modal-bottom sm:modal-middle"
      onKeyDownCapture={handleKeyboardDown}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">금액 납부 확인</h3>
        <p className="py-4">해당 금액을 납부하실꺼임?</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-error w-24 text-white"
              onClick={handleBackdrop}
            >
              취소
            </button>

            <button className="btn btn-primary w-24 ml-3">납부 하기</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
