type Vacation = {
  totalCount: number;
  usedCount: number;
};

type Position = {
  id: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
  description?: string;
};

type User = {
  id: number;
  userId: string;
  email: string;
  name: string;
  role?: string;
  position?: Position;
  team: Team;
  avatar?: string;
  nowVacation?: {
    id: number;
    year: number;
    general: Vacation;
    alternative: Vacation;
  };
  chatRoom: {
    id: string;
  };
};

type UserState = {
  user?: User;
  isLoading: boolean;
  isLoggedIn: boolean;
  alternativeVacations: AlternativeVacation[];
  users: User[];
};

type AlternativeVacation = {
  id: number;
  effectiveDate: Date;
  effectiveReason: string;
  effectiveCount: number;
  usedCount: number;
};
