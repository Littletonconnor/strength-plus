import { WorkoutSchedule } from "@prisma/client";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { Button } from "~/components/button/button";
import { Input } from "~/components/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";
import { H1, H3, P, Strong } from "~/components/typography/typography";
import {
  createWorkoutSchedule,
  getWorkoutScheduleById,
} from "~/models/schedule.server";
import { getUserId } from "~/session.server";
import { capitalize } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Profile" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);

  if (!userId) {
    return { status: 401, redirect: "/login" };
  }

  const workoutSchedule = await getWorkoutScheduleById(userId);

  return json({ data: workoutSchedule });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const day = formData.get("day");
  const title = formData.get("title");
  // TODO: add intent

  if (!userId) {
    return { status: 401, redirect: "/login" };
  } else if (!day) {
    // return json({ errors: [{ message: "Day is required." }] }, { status: 400 });
    // } else if (!title) {
    //   return json(
    //     {
    //       errors: [
    //         {
    //           message: "We would like to retrieve the title for this component.",
    //         },
    //       ],
    //     },
    //     { status: 400 },
    //   );
  }

  const workoutSchedule = (await getWorkoutScheduleById(userId)) as any;

  for (const workout of workoutSchedule) {
    if (day === workout.day) {
      return json(
        { errors: [{ message: "This day already exists in your schedule." }] },
        { status: 400 },
      );
    }
  }

  const updatedWorkoutSchedule = createWorkoutSchedule(userId, workoutSchedule);

  return json({ data: updatedWorkoutSchedule });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  console.log(actionData);

  return (
    <main className="mx-auto p-8 pt-6 relative min-h-screen bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="space-y-6">
          <H1>Workout Schedule</H1>
          <Form method="post" className="space-y-2">
            <Select name="day">
              <SelectTrigger className="w-[225px]">
                <SelectValue placeholder="Add workout to your schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
            {/* @ts-expect-error I dont really know */}
            {actionData?.errors?.[0].message ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {/* @ts-expect-error I dont really know */}
                {actionData.errors[0].message}
              </p>
            ) : null}
            <Button type="submit">Add Day</Button>
          </Form>
          <div className="pt-12 grid grid-cols-3">
            {data.map((workout: WorkoutSchedule) => {
              return (
                <div
                  className="space-y-1 rounded-xl border p-4 font-mono text-sm shadow-sm"
                  key={workout.id}
                >
                  <H3>{capitalize(workout.day)}</H3>
                  <P>Today is the day. Let us workout hard!</P>
                  <Form method="post" className="w-[320px] space-y-5">
                    <fieldset>
                      <Strong>Day</Strong>
                      <Input id="day" name="day" placeholder={workout.day} />
                    </fieldset>
                    <fieldset>
                      <Strong>Title</Strong>
                      <Input
                        id="title"
                        name="title"
                        placeholder={workout.title}
                      />
                    </fieldset>
                    <div className="flex w-full justify-between gap-2">
                      <Button type="reset" variant="destructive">
                        Remove
                      </Button>
                      <Button type="submit">Update</Button>
                    </div>
                  </Form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
