import type { MetaFunction } from "@remix-run/node";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  if (user) console.log("user", user);
  if (!user) console.log("no user");

  return (
    <main>
      <div className="px-4 sm:px-6 mx-auto">
        <div>Workouts</div>
      </div>
    </main>
  );
}
