import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Link as RemixLink,
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
import { Link } from "~/components/link/link";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/dropdown_menu/dropdown_menu";

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
              <RemixLink to="/">Strength Plus</RemixLink>
            </h1>
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link to="/workouts">Workouts</Link>
                </li>
                <li>
                  <Link to="/log-book">Log book</Link>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="h-7 w-7">
                        <AvatarImage src="/avatar.svg" alt="User profile" />
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/schedule">Schedule</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
