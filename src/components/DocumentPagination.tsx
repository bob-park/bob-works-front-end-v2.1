// react
import { useEffect, useState } from 'react';

type DocumentPaginationProps = {
  total: number;
  current: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function DocumentPagination({ total, current, onNext, onPrev }: DocumentPaginationProps) {
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
      <button className="btn join-item" disabled={current === 1} onClick={handlePrev}>
        «
      </button>
      <button className="btn join-item">Page {current}</button>
      <button className="btn join-item" disabled={current === total} onClick={handleNext}>
        »
      </button>
    </div>
  );
}
