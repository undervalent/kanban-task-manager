
import type { ISubTask } from "~/lib/types";

export function completedCount(subTasks: ISubTask[]): number {
  const completed = subTasks.filter(subTask => subTask.isCompleted)
  return completed.length;
}
