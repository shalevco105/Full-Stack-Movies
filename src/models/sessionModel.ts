export interface SessionModel {
    sessionId: string;
    actions: Array<{ numOfActionLeft: number; actionExecuted: string; date: Date }>;
  }
  