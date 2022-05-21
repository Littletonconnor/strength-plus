import { CheckIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import { Popover } from '@headlessui/react';
import Modal from 'components/Modal';
import AddExercise from 'components/Modal/AddExercise';
import { SelectedWorkout, Workout } from 'components/Modal/utils';
import Spacer from 'components/Spacer';
import { Start } from 'components/Svg';
import useTimer from 'lib/hooks/useTimer';
import React, { useState } from 'react';
import http from 'lib/http';
import qs from 'query-string';
import Spinner from 'components/Spinner';
import { v4 } from 'uuid';

function genEmptySet(id: number) {
  return { id: v4(), lbs: '', reps: '', exerciseId: id };
}

function maybeAddEmptySets(exercises: any) {
  return exercises.map((exercise: any) => ({
    ...exercise,
    exerciseStats: exercise.exerciseStats.length > 0 ? exercise.exerciseStats : [genEmptySet(exercise.id)],
  }));
}

interface Props {
  closeModal: () => void;
}

function WorkoutModal({ closeModal }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<SelectedWorkout[]>([]);
  const [loading, setLoading] = useState(false);

  const time = 1; // useTimer(open);

  const openModal = () => setOpen(true);

  const onHandleClose = () => {
    setSelectedExercises([]);
    closeModal();
  };

  const onAddSet = (selectedExercise: any) => {
    const selectedIdx = selectedExercises.findIndex((s) => selectedExercise.id === s.id);
    setSelectedExercises((exercises: any) => {
      const newExercise = exercises[selectedIdx];
      newExercise.sets = [...newExercise.sets, genEmptySet(newExercise.id)];
      return [...exercises];
    });
  };

  const onRemoveSet = (selectedExercise: any) => {
    const selectedIdx = selectedExercises.findIndex((s) => selectedExercise.id === s.id);
    setSelectedExercises((exercises: any) => {
      const newExercise = exercises[selectedIdx];
      if (newExercise.sets.length > 1) {
        newExercise.sets = [...newExercise.sets.slice(0, -1)];
      }
      return [...exercises];
    });
  };

  const onHandleSetExercises = async (selected: Workout[]) => {
    const newSelected = [...selectedExercises, ...selected];
    const qsWorkoutNames = qs.stringify({ workouts: newSelected.map((s) => s.name) }, { arrayFormat: 'bracket' });
    const url = 'http://localhost:3000/api/add-workout?' + new URLSearchParams(qsWorkoutNames);
    try {
      setLoading(true);
      const response = await http.get(url);
      setSelectedExercises(maybeAddEmptySets(response.exercises));
    } catch (error) {
      // todo(connor): display actual error message
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal onClose={closeModal}>
        <div className="flex flex-col py-3 px-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <button>
                <Start className="h-full w-6 items-baseline text-gray-500" />
              </button>
              <span className="text-xs font-semibold text-gray-500">{time}</span>
            </div>
            <button className="rounded-lg bg-primary py-2 px-4 text-sm font-semibold text-white">Finish</button>
          </div>
          <Spacer size={32} />
          {loading ? (
            <div className="flex justify-center">
              <Spinner className="h-10 w-10 text-primary" />
            </div>
          ) : null}
          {selectedExercises.length > 0
            ? selectedExercises.map((selectedExercise, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <div key={selectedExercise.id} className="flex flex-col">
                      <div className="flex items-center">
                        <button className="text-lg font-bold text-gray-700">{selectedExercise.name}</button>
                        <button className="ml-auto">
                          <DotsHorizontalIcon className="h-5 w-5 fill-primary" />
                          <MyPopover />
                        </button>
                      </div>
                      <Spacer size={32 / 2} />
                      <div className="grid grid-cols-8 items-center justify-items-center gap-2">
                        <p className="col-span-1">Set</p>
                        <p className="col-span-2">Previous</p>
                        <p className="col-span-2">lbs</p>
                        <p className="col-span-2">Reps</p>
                        <button className="col-span-1 ml-1 py-1 px-2">
                          <CheckIcon className="h-5 w-5 text-primary" />
                        </button>
                      </div>
                      <Spacer size={32 / 4} />
                      {selectedExercise.sets.map((set: any, i: number) => {
                        return (
                          <React.Fragment key={i}>
                            <div className="grid grid-cols-8 items-center gap-2 text-center" key={i}>
                              <span className="col-span-1 w-fit rounded-md bg-gray-200 py-1 px-2 text-sm font-bold">
                                {i + 1}
                              </span>
                              {set.lbs && set.reps ? (
                                <span className="col-span-2 w-full py-1 text-sm font-semibold text-gray-800">
                                  {set.lbs + ' x ' + set.reps}
                                </span>
                              ) : (
                                <span className="col-span-2 w-full py-1 text-center font-semibold text-gray-800">
                                  <span className="mx-auto block h-[3px] w-1/2 bg-gray-300" />
                                </span>
                              )}
                              <input
                                placeholder={set.lbs || ''}
                                type="number"
                                className="col-span-2 w-full rounded-md bg-gray-200 text-center font-semibold"
                              />
                              <input
                                placeholder={set.reps || ''}
                                type="number"
                                className="col-span-2 w-full rounded-md bg-gray-200 text-center"
                              />
                              <button className="col-span-1 py-1 px-2">
                                <CheckIcon className="h-5 w-5 text-primary" />
                              </button>
                            </div>
                            <Spacer size={32 / 4} />
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <Spacer size={32 / 4} />
                    <button
                      onClick={() => onAddSet(selectedExercise)}
                      className="rounded-lg bg-gray-300 py-[1px] px-4 text-base font-semibold text-gray-600"
                    >
                      Add set
                    </button>
                    <Spacer size={32 / 4} />
                    <button
                      onClick={() => onRemoveSet(selectedExercise)}
                      className="rounded-lg bg-red-200 py-[1px] px-4 text-base font-semibold text-red-500"
                    >
                      Remove set
                    </button>
                    <Spacer size={32} />
                  </React.Fragment>
                );
              })
            : null}
          <Spacer size={32} />
          <button onClick={openModal} className="rounded-lg bg-primary py-2 px-4 text-base font-semibold text-white">
            Add Exercises
          </button>
          <Spacer size={32 / 2} />
          <button
            onClick={onHandleClose}
            className="rounded-lg bg-red-200 py-2 px-4 text-base font-semibold text-red-500"
          >
            Cancel Workout
          </button>
        </div>
      </Modal>
      <AddExercise closeModal={() => setOpen(false)} open={open} setSelectedExercises={onHandleSetExercises} />
    </>
  );
}

function MyPopover() {
  return (
    <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default WorkoutModal;
