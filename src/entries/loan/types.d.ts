type LoanRepaymentType =
  | 'LEVEL_PAYMENT'
  | 'EQUAL_PRINCIPAL_PAYMENT'
  | 'BALLOON_PAYMENT'
  | 'CUSTOM';

interface LonRepaymentHistory {
  id: number;
  principal: number;
  interest: number;
  round: number;
  isRepaid: boolean;
  repaymentDate?: Date;
  createdDate: Date;
  lastModifiedDate?: Date;
}

interface Loan {
  id: number;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  repaymentDate: number;
  interestRate: number;
  repaymentType: LoanRepaymentType;
  totalBalance: number;
  repaymentCount: number;
  endingBalance: number;
  defaultRepaymentBalance?: number;
  repaymentHistories: LonRepaymentHistory[];
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}
