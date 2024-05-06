import delay from '@/utils/common';

export async function addLoan(body: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  repaymentDate: number;
  interestRate: number;
  repaymentType: LoanRepaymentType;
  totalBalance: number;
  defaultRepaymentBalance?: number;
}) {
  const response = await fetch(`/api/loan`, {
    method: 'post',
    next: {
      tags: ['add', 'loan'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  await delay(1_000);

  return response.json().then((res: LoanRepaymentHistory) => res);
}

export async function getAll() {
  const response = await fetch(`/api/loan/all`, {
    method: 'get',
    next: {
      tags: ['loan', 'all'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json().then((res: Loan[]) => res);
}

export async function getDetail(loanId: number) {
  const response = await fetch(`/api/loan/${loanId}`, {
    method: 'get',
    next: {
      tags: ['loan', 'all'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json().then((res: Loan) => res);
}

export async function repayLoan(repayId: number) {
  const response = await fetch(`/api/loan/repay/${repayId}`, {
    method: 'post',
    next: {
      tags: ['loan', 'repay', repayId + ''],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  await delay(1_000);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json().then((res: LoanRepaymentHistory) => res);
}
