import { CheckIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import Modal from 'components/Modal';
import AddExercise from 'components/Modal/AddExercise';
import { SelectedWorkout, Workout } from 'components/Modal/utils';
import Spacer from 'components/Spacer';
import { Start } from 'components/Svg';
import { AnimatePresence } from 'framer-motion';
import useTimer from 'lib/hooks/useTimer';
import React, { useState } from 'react';

function WorkoutModal() {
  const [open, setOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<SelectedWorkout[]>([]);

  const time = useTimer(open);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onHandleClose = () => {
    setSelectedExercises([]);
    closeModal();
  };

  const onHandleSetExercises = (selected: Workout[]) => {
    const newSelectedExercises = selected.map((s) => ({ ...s, sets: 1 }));
    setSelectedExercises(newSelectedExercises);
  };

  return (
    <>
      <button
        className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-lg font-semibold text-white"
        onClick={openModal}
      >
        Start workout
      </button>
      <AnimatePresence>
        {open && (
          <Modal onClose={closeModal}>
            <div className="flex flex-col py-3 px-5">
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
              {selectedExercises.length > 0
                ? selectedExercises.map((selectedExercise) => {
                    return (
                      <>
                        <div key={selectedExercise.id} className="flex flex-col">
                          <div className="flex items-center">
                            <button className="text-lg font-bold text-gray-700">{selectedExercise.name}</button>
                            <button className="ml-auto">
                              <DotsHorizontalIcon className="h-5 w-5 fill-primary" />
                            </button>
                          </div>
                          <Spacer size={32 / 2} />
                          <div className="grid grid-cols-5 gap-6">
                            <p>Set</p>
                            <p>Previous</p>
                            <p>lbs</p>
                            <p>Reps</p>
                            <button className="py-1 px-2 ">
                              <CheckIcon className="h-5 w-5 text-primary" />
                            </button>
                          </div>
                          <Spacer size={32 / 4} />
                          {Array.from({ length: selectedExercise.sets }, (_, i) => {
                            // todo(connor): Add dynamic id to set
                            return (
                              <>
                                <div className="grid grid-cols-5 gap-6 text-center" key={i}>
                                  <span className="w-fit rounded-md bg-gray-200 py-1 px-2 text-sm font-bold">
                                    {i + 1}
                                  </span>
                                  <span className="w-full rounded-md bg-gray-200 py-1 px-2 text-sm font-bold">
                                    &mdash;
                                  </span>
                                  <input type="number" className="w-full rounded-md bg-gray-200 text-center" />
                                  <input type="number" className="w-full rounded-md bg-gray-200 text-center" />
                                  <button className="w-fit rounded-md bg-gray-200 px-2 py-1">
                                    <CheckIcon className="h-5 w-5 text-primary" />
                                  </button>
                                </div>
                                <Spacer size={32 / 4} />
                              </>
                            );
                          })}
                        </div>
                        <Spacer size={32 / 4} />
                        <button
                          onClick={onHandleClose}
                          className="rounded-lg bg-gray-300 py-[1px] px-4 text-base font-semibold text-gray-600"
                        >
                          Add set
                        </button>
                        <Spacer size={32} />
                      </>
                    );
                  })
                : null}
              <Spacer size={32} />
              <AddExercise setSelectedExercises={onHandleSetExercises} />
              <Spacer size={32 / 2} />
              <button
                onClick={onHandleClose}
                className="rounded-lg bg-red-200 py-2 px-4 text-base font-semibold text-red-500"
              >
                Cancel Workout
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default WorkoutModal;
