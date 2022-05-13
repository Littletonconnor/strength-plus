export type Workout = { id: number; name: string };

export type SelectedWorkout = Workout & {
  sets: number;
};
