import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/avatar/avatar";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full">
        <header className="sticky top-0 z-50 w-full border-b h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center max-w-6xl px-4 mx-auto h-full">
            <h1 className="text-3xl font-bold">
              <Link to="/">Strength Plus</Link>
            </h1>
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link to="/log-book">Log book</Link>
                </li>
                <li>
                  <Link to="/workouts">Workouts</Link>
                </li>
                <li>
                  <Link to="/profile">
                    <Avatar>
                      <AvatarImage src="/avatar.svg" alt="User profile" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
