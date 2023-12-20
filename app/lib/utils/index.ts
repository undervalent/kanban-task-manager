import type { SubTask } from "@prisma/client";
import type { ISubTask } from "~/lib/types";

export function getCompletedSubTaskCount(subTasks: SubTask[] | ISubTask[]) {
  const completed = subTasks.filter(subTask => subTask.isCompleted)
  return completed.length;
}
