import * as React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./kanban-board.css";
import {DndContext} from '@dnd-kit/core';
import { Column, links as columnLinks } from "../column";
import type { IColumn, IBoard } from "~/lib/types";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...columnLinks()
];

interface Props {
  board: IBoard
}

function useKanBanBoard(board: IBoard) {
  console.log('BOARD -->',board)

  const handlers = {
    onDragEnd: (result: any) => {
      console.log(result)
     },
    onDragstart: (result: any) => {

      console.log(result)
    },
  }
  return [handlers]
}

export function KanBanBoard({ board }: Props) {
  const [{ onDragEnd, onDragstart}] = useKanBanBoard(board);

    return  <div className="kanban-board">
      <DndContext
        onDragEnd={onDragEnd}
        onDragStart={onDragstart}
      >
        {board.columns.map((column: IColumn) => <Column key={column.id} column={column} />)}
      </DndContext>
    </div>


}
