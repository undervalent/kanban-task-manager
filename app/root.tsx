import { cssBundleHref } from "@remix-run/css-bundle";
import { json} from "@remix-run/node";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import globalStyles from '~/lib/styles/global.css'
import darkStyles from '~/lib/styles/dark.css'
import { links as buttonLinks } from "./components/button";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
  NavLink
} from "@remix-run/react";
import db from '~/lib/data/data.json'
import Logo from '~/lib/assets/images/logo.svg'
import IconBoard from '~/lib/assets/images/icon-board.svg'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: darkStyles, media: '(prefers-color-scheme: dark)' },
  ...buttonLinks(),
];

export async function loader({ params }: DataFunctionArgs) {
  const { boardId } = params;
  const boards = db?.boards;
  const activeBoard = db.boards.find((board) => board.id === boardId);

  return json({ boards, activeBoard });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container">
          <aside className="sidebar">
            <header className="logo">
              <Link to='/' className="logo__link">
                <h1 className="heading-xl logo__heading">
                  <img src={Logo} alt="Kanban logo" />
                  Kanban</h1>
              </Link>
            </header>
            <section className="sidebar__navigation">
              <h2 className="heading-s">All Boards ({data.boards.length})</h2>
              <ul className="navigation-list">
                {data.boards.map((board) => <li key={board.id}>
                  <NavLink className="navigation-link" to={`board/${board.id}`} prefetch="intent">
                    <img src={IconBoard} alt="board icon" />  {board.name}
                  </NavLink>
                </li>)}
                <li>
                  <NavLink to="/" className="navigation-link">
                    <img src={IconBoard} alt="board icon" /> Create New Board
                  </NavLink>
                </li>
              </ul>
            </section>
            <footer className="sidebar-control">
              <button>Hide sidebar</button>
            </footer>
          </aside>
          <section>
            <Outlet />
          </section>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
