"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/command/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/popover/popover";
import { cn } from "~/utils";

const exercises = [
  {
    value: "chest-press",
    label: "Chest Press",
  },
  {
    value: "squats",
    label: "Squats",
  },
  {
    value: "db-curls",
    label: "DB Curls",
  },
  {
    value: "db-shoulder-press",
    label: "DB Shoulder Press",
  },
  {
    value: "db-bench-press",
    label: "DB Bench Press",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? exercises.find((exercise) => exercise.value === value)?.label
            : "Select a workout..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {exercises.map((exercise) => (
              <CommandItem
                key={exercise.value}
                value={exercise.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === exercise.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {exercise.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
