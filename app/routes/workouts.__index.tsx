import type { MetaFunction } from "@remix-run/node";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Workouts" }];

export default function Index() {
  const user = useOptionalUser();
  if (user) console.log("user", user);
  if (!user) console.log("no user");

  return (
    <main className="p-8 pt-6 relative min-h-screen bg-white">
      <div className="max-w-6xl px-4 mx-auto">Workouts</div>
    </main>
  );
}
