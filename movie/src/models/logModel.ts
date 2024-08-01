export interface LogModel {
    userId: string;
    actions: Array<{ numOfActionLeft: number; actionExecuted: string; date: Date }>;
  }
  