import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import type { LinksFunction, DataFunctionArgs } from "@remix-run/node";
import db from "~/lib/data/data.json";
import { useLoaderData } from "@remix-run/react";
import { invariantResponse } from "~/utils";
import boardStylesUrl from "./board.css";
import { EmptyBoard, links as emptyBoardLinks } from "./components/empty-board";
import { Button } from "~/components/button";
import {
  KanBanBoard,
  links as kanbanBoardLinks,
} from "./components/kanban-board";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: boardStylesUrl },
  ...emptyBoardLinks(),
  ...kanbanBoardLinks(),
];
export async function loader({ params }: DataFunctionArgs) {
  const { boardId } = params;

  const board = db.boards.find((board) => board.id === boardId);
  invariantResponse(board, "Board not found");

  return json({ board });
}

function usePageData(data: any) {
  console.log("USE PAGTE -->", data);

  return [{ hasColumn: data?.board?.columns?.length }];
}

export default function Board() {
  const data = useLoaderData<typeof loader>();
  const [{ hasColumn }] = usePageData(data);

  return (
    <section>
      <header className="main-header">
        <h2>{data.board?.name}</h2>
        <Button>+ Add New Task</Button>
      </header>
      <article className="content">
        {hasColumn ? <KanBanBoard /> : <EmptyBoard />}
      </article>
    </section>
  );
}
