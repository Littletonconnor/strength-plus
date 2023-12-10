import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/command/command";
import { Divider } from "~/components/divider/divider";
import { Input } from "~/components/input/input";
import { Label } from "~/components/label/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/popover/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";
import { Textarea } from "~/components/textarea/textarea";
import { H1, Muted } from "~/components/typography/typography";
import { exercises } from "~/constants";
import { getScheduleById } from "~/models/schedule.server";
import { getUserId } from "~/session.server";
import { cn } from "~/utils";

export const meta: MetaFunction = () => [{ title: "S+ | Schedule" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);

  if (!userId) {
    throw new Response("User is not authorized to hit this route", {
      status: 401,
    });
  }

  const workoutSchedule = await getScheduleById(userId);

  return json({ data: workoutSchedule });
};

export default function Index() {
  const [exerciseLength, setExerciseLength] = useState(0);
  const [open, setOpen] = useState(-1);
  const [value, setValue] = useState("");

  return (
    <main className="p-8 pt-20 relative min-h-screen bg-white">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <H1>Create a Workout</H1>
            <Muted>
              Create a new workout and add it to your weekly schedule.
            </Muted>
          </div>
          <Form className="w-full space-y-4">
            <fieldset>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Workout title" />
            </fieldset>
            <fieldset>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Workout description"
              />
            </fieldset>
            <fieldset>
              <Label htmlFor="day">Select a day</Label>
              <Select name="day">
                <SelectTrigger id="day" className="w-40">
                  <SelectValue placeholder="Select a day" />
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
            </fieldset>
            <fieldset className="flex flex-col gap-1.5 pb-2">
              <Label htmlFor="description">Exercises</Label>
              <Muted>Select an exercise to add to your Workout.</Muted>
              {new Array(exerciseLength).fill(null).map((_, index) => (
                <Popover
                  key={index}
                  open={open === index}
                  onOpenChange={() => setOpen(index)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      name={`exercise-${index}`}
                      role="combobox"
                      aria-expanded={open === index}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? exercises.find((exercise) => exercise.value === value)
                            ?.label
                        : "Select a workout..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="h-72 w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {exercises.map((exercise) => (
                          <CommandItem
                            key={exercise.value}
                            value={exercise.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpen(-1);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === exercise.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {exercise.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              ))}
              <Button
                onClick={() => setExerciseLength(exerciseLength + 1)}
                className="w-fit mt-1"
                id="add-exercise"
                name="add-exercise"
              >
                Add exercise
              </Button>
            </fieldset>
            <Divider />
            <div className="pt-6 flex gap-2 justify-end">
              <Button variant="ghost" type="reset" className="w-fit">
                Reset
              </Button>
              <Button type="submit" className="w-fit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
