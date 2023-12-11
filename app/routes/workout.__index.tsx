import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData, Link as RemixLink } from "@remix-run/react";
import { Dumbbell, CalendarCheck } from "lucide-react";

import { Button } from "~/components/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card/card";
import { Link } from "~/components/link/link";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => [{ title: "S+ | Workout" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const templates = await prisma.template.findMany({
    where: { userId: user.id },
  });

  return json({ templates });
};

export async function action() {
  return { ok: true, status: 200 };
}

/**
 * TODO:
 *  Workouts - Create workout, view history
 *  Routines - Create routine, explore. Underneath list of routines already made by user.
 */

export default function WorkoutIndex() {
  const data = useLoaderData<typeof loader>();
  const templates = data.templates;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="py-6 text-3xl font-bold">Workouts</h1>
      <main className="flex flex-col gap-4 py-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* TODO: Create empty state button */}
          <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <RemixLink to="/workout/create">
              <Dumbbell className="mx-auto h-10 w-10 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Create a workout
              </span>
            </RemixLink>
          </button>
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-4">
              <CardTitle>Create Workout Routine</CardTitle>
              <CardDescription>
                Start creating your own workout routine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm">
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
        <section className="py-4 space-y-4">
          <h2 className="text-3xl font-bold">Workout Routines</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <RemixLink to="/routine/create">
                <CalendarCheck className="mx-auto h-10 w-10 text-gray-400" />
                <span className="mt-2 block text-sm font-semibold text-gray-900">
                  Create a routine
                </span>
              </RemixLink>
            </button>
            <Card className="flex flex-col justify-between">
              <CardHeader className="pb-4">
                <CardTitle>View Curated Routines</CardTitle>
                <CardDescription>
                  View workout routines curated by our expert trainers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to="/template/explore"
                  variant="default"
                  className="w-full mt-auto"
                  size="sm"
                >
                  View
                </Link>
              </CardContent>
            </Card>
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-4">
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    variant="default"
                    className="w-full"
                    to="/template/create"
                  >
                    Start
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
