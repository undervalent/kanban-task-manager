import * as React from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./kanban-board.css";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, links as cardLinks } from "../card";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...cardLinks(),
];

export function KanBanBoard() {
  return (
    <div className="kanban-board">
      <DragDropContext></DragDropContext>
      <Card />
    </div>
  );
}
