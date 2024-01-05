import type { LinksFunction } from '@remix-run/node'

import styles from './empty-board.css'

import { Button } from '~/components/button';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export function EmptyBoard() {
  return (
    <section className="empty-board">
      <p className='empty-board__headline'>This board is empty. Create a new column to get started.</p>
      <Button variant="primary">+ Add New Column</Button>
    </section>
  )
}
