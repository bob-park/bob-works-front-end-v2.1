// react
import { useEffect, useState } from 'react';

type DocumentPaginationProps = {
  total: number;
  current: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function DocumentPagination({
  total,
  current,
  onNext,
  onPrev,
}: DocumentPaginationProps) {
  // useEffect

  // handle
  const handlePrev = () => {
    onPrev && onPrev();
  };

  const handleNext = () => {
    onNext && onNext();
  };

  return (
    <div className="join">
      <button
        className="join-item btn"
        disabled={current === 1}
        onClick={handlePrev}
      >
        «
      </button>
      <button className="join-item btn">Page {current}</button>
      <button
        className="join-item btn"
        disabled={current === total}
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
}
