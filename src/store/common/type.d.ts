type CommonState = {
  alerts: SystemAlert[];
};

type SystemAlert = {
  level: SystemAlertLevel;
  message: string;
  createAt: Date;
};

type SystemAlertLevel = 'info' | 'error' | 'warn';
