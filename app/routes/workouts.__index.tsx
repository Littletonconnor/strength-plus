import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import { Button } from "~/components/button/button";
import { Input } from "~/components/input/input";
import { Label } from "~/components/label/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/popover/popover";
import { H1, Muted, P } from "~/components/typography/typography";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Workouts" }];

export async function action() {
  return { ok: true, status: 200 };
}

export default function WorkoutIndex() {
  const user = useOptionalUser();
  if (user) console.log("user", user);
  if (!user) console.log("no user");

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [editWorkout, setEditWorkout] = useState(false);
  const [workoutName, setWorkoutName] = useState("<Workout Name>");

  return (
    <main className="p-8 pt-6 relative min-h-screen bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        {workoutStarted ? (
          <div className="space-y-4">
            <H1>{workoutName}</H1>
            <Popover
              open={editWorkout}
              onOpenChange={() => setEditWorkout(!editWorkout)}
            >
              <PopoverTrigger asChild>
                <Button variant="outline">Edit Workout</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Workout</h4>
                    <Muted>Edit the workout settings.</Muted>
                    <p className="text-sm text-muted-foreground"></p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      // Not submitting to route because we blow away client side data and i'm not familiar enough with Remix yet to do this the remix way.
                      // Maybe move this to new route?
                      const formData = new FormData(e.currentTarget);
                      e.preventDefault();

                      const workoutName = formData.get("workout-name");

                      if (workoutName) {
                        setWorkoutName(workoutName.toString());
                      }

                      setEditWorkout(false);
                    }}
                  >
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="workout-name">Name</Label>
                        <Input
                          id="workout-name"
                          name="workout-name"
                          className="col-span-2 h-8"
                          defaultValue={workoutName}
                          placeholder={workoutName}
                        />
                      </div>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Start Workout</h1>
            <Button
              onClick={() => {
                setWorkoutStarted(!workoutStarted);
              }}
              variant="default"
            >
              <P>Start Workout</P>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
