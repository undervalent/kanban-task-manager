import React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./card.styles.css";
import type { ITask } from "~/lib/types";
import { useDraggable } from '@dnd-kit/core';
import { completedCount } from "./utils";

interface Props {
  task: ITask;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];


function useCardData(task: ITask) {
  const count = completedCount(task.subTask);

   const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
   });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  return [
    { completed: count, total: task.subTask.length, attributes, listeners, setNodeRef },
    {style}
  ]
}


export function Card({ task }: Props) {
  const [{  completed, total, attributes, listeners, setNodeRef }, {style} ] = useCardData(task)

  return (
      <li className="card" style={style} ref={setNodeRef} {...listeners} {...attributes}>
        <h3 className="card__title">{task.title}</h3>
        <p className="card__description">{completed} of {total} subtasks</p>
      </li>
  );
}
