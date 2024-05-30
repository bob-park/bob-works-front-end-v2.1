type DocumentType = 'VACATION' | 'HOLIDAY_WORK';
type VacationType = 'GENERAL' | 'ALTERNATIVE';
type VacationSubType = 'AM' | 'PM';

interface AlterVacationInfo {
  id: number;
  effectiveDate: Date;
  effectiveCount: number;
  effectiveReason: string;
  usedCount: number;
}

interface UsageVacation {
  id: number;
  type: DocumentType;
  vacationType: VacationType;
  vacationSubType?: VacationSubType;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  daysCount: number;
  reason: String;
  alternativeVacations: AlterVacationInfo[];
}
