export enum Status {
  Unfinished = "unfinished",
  Done = "done",
}

export interface Todo {
  id: string;
  status: Status;
  content: string;
  dueDate?: string;
}
