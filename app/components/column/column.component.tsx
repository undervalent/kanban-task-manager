import React from 'react'
import type { LinksFunction } from '@remix-run/node';
import type { IColumn } from '~/lib/types';
import { TaskList, links as TaskListLinks } from '../task-list';
import styles from './column.css'

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...TaskListLinks()
];

interface Props {
  column: IColumn;
}

export function Column({ column }: Props) {
  return (
    <section className="column">
      <h2 className="heading-s">{column.name} ({column.task.length})</h2>
      <TaskList column={column} />
    </section>
  )
}
