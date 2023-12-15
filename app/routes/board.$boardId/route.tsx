import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import type { LinksFunction, DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { invariantResponse } from "~/utils";
import boardStylesUrl from "./board.css";
import { EmptyBoard, links as emptyBoardLinks } from "./components/empty-board";
import { Button } from "~/components/button";
import {
  KanBanBoard,
  links as kanbanBoardLinks,
} from "./components/kanban-board";

import prisma from "prisma/client";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: boardStylesUrl },
  ...emptyBoardLinks(),
  ...kanbanBoardLinks(),
];
export async function loader({ params }: DataFunctionArgs) {
  const { boardId } = params;

const board = await prisma.board.findUnique({
  where: { id: boardId },
  include: {
    columns: {
      include: {
        task: {
          include: {
                subTask: {
                  where: {
                    isCompleted: true
              }
            }
          }
        }
      }
    },
  }
})
  invariantResponse(board, "Board not found");
  return json({ board, hasColumn: Boolean(board?.columns?.length) })
}


export default function Board() {
  const { board, hasColumn } = useLoaderData<typeof loader>();
  return (
    <section>
      <header className="main-header">
        <h2>{board?.name}</h2>
        <Button>+ Add New Task</Button>
      </header>
      <article className="content">
        {hasColumn ? <KanBanBoard board={board} /> : <EmptyBoard />}
      </article>
    </section>
  );
}
