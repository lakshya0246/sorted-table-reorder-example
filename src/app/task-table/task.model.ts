export interface TaskType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  assignedTo: string;
  dueAtDistance: string;
  dueAt: Date;
}
