
export interface ISubTask {
  title: string;
  isCompleted: boolean;
}
export interface ITask {
  id: string;
  title: string;
  description: string,
  status: 'Todo' | 'Doing' | 'Done',
  subTask: ISubTask[]
}
export interface IColumn {
  name: string;
  id: string;
  task: ITask[]
}

export interface IBoard {
  name: string;
  id: string;
  columns: IColumn[]
}
