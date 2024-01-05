import React from 'react'
import type { IColumn } from '~/lib/types'
import { Card, links as cardLinks } from '../card';
import type { LinksFunction } from '@remix-run/node';
import styles from './task-list.css'
import { useDroppable } from '@dnd-kit/core';

interface Props {
  column: IColumn;
}
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...cardLinks()
];
export function TaskList({ column }: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id: column.name,
  });

  return (
    <ul
      ref={setNodeRef}
      className="task-list"
    >
      {column.task.map((task) => <Card key={task.title}  task={task} />)}
    </ul>
  )
}
