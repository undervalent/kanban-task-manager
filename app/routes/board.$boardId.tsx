
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import type { LinksFunction, DataFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData , Outlet } from "@remix-run/react";
import { invariantResponse } from "~/utils";
import { EmptyBoard, links as emptyBoardLinks } from "~/components/empty-board";
import { Button } from "~/components/button";
import {
  KanBanBoard,
  links as kanbanBoardLinks,
} from "~/components/kanban-board";
import prisma from "prisma/client";

import { prefs } from "~/components/kanban-board/cookie";
import { getColumnNames } from "~/components/kanban-board/utils";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...emptyBoardLinks(),
  ...kanbanBoardLinks(),
];
export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefs.parse(cookieHeader)) || {};
  console.log('COOKIE -->', cookie)
  return json({});
}
export async function loader({ params, request }: DataFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const { boardId } = params;

  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      columns: {
        include: {
          task: {
            include: {
              subTask: true
            }
          }
        }
      },
    }
  })
  invariantResponse(board, "Board not found");
  const columnNames = getColumnNames(board.columns)
  cookie.columnNames = columnNames;
  return json({ board, hasColumn: Boolean(board?.columns?.length) }, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie)
    }
  })
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
      <Outlet />
    </section>
  );
}
