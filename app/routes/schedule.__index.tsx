import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card/card";
import { Link } from "~/components/link/link";
import { H1, H2, Muted, P } from "~/components/typography/typography";
import {
  getScheduleById,
  getWorkoutsByScheduleId,
} from "~/models/schedule.server";
import { getUserId } from "~/session.server";
import { capitalize } from "~/utils";

export const meta: MetaFunction = () => [{ title: "S+ | Schedule" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);

  if (!userId) {
    throw new Response("User is not authorized to hit this route", {
      status: 401,
    });
  }

  const schedule = await getScheduleById(userId);

  if (!schedule) {
    return redirect("/schedule/new");
  }

  const workouts = await getWorkoutsByScheduleId(schedule.id);

  return json({ schedule, workouts });
}

export default function Index() {
  const { schedule, workouts } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto p-8 pt-6 relative min-h-screen bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="space-y-12">
          <div className="space-y-2">
            <H1>{schedule.title}</H1>
            <Link variant="outline" to="/schedule/edit">
              Edit Schedule
            </Link>
          </div>
          <div className="grid grid-cols-[320px,1fr] gap-12">
            <section className="space-y-4">
              <H2>Weekly</H2>
              {workouts.map((workout) => {
                return (
                  <Card className="relative" key={workout.id}>
                    <Link
                      className="absolute right-0 top-3"
                      to={`/workout/${workout.id}/edit`}
                    >
                      <Muted>Edit</Muted>
                    </Link>
                    <CardHeader>
                      <CardTitle>{workout.title}</CardTitle>
                      <CardDescription>
                        {capitalize(workout.day)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{workout.description}</CardContent>
                  </Card>
                );
              })}
            </section>
            <section className="space-y-4">
              <H2>Monthly</H2>
              <P>Calendar goes here</P>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
