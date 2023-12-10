import type { MetaFunction } from "@remix-run/node";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Workouts" }];

export async function action() {
  console.log("@@@@ ACTION WORKOUTS INDEX");
  return { ok: true, status: 200 };
}

export default function WorkoutIndex() {
  const user = useOptionalUser();
  if (user) console.log("user", user);
  if (!user) console.log("no user");

  return (
    <main className="p-8 pt-6 relative min-h-screen bg-white">
      Workout page
    </main>
  );
}
