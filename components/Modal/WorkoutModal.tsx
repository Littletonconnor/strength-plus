import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Spacer from 'components/Spacer';
import { Start } from 'components/Svg';
import React from 'react';
import Modal from './Modal';
import AddExercises, { Workout } from './AddExercisesModal';

function WorkoutModal() {
  const [open, setOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Workout[]>([]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onHandleClose = () => {
    setSelectedExercises([]);
    closeModal();
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
                <button>
                  <Start className="h-6 w-6 text-gray-500" />
                </button>
                <button className="rounded-lg bg-primary py-2 px-4 text-sm font-semibold text-white">Finish</button>
              </div>
              <div className="flex flex-col"></div>
              <Spacer size={32} />
              <div className="flex flex-col space-y-4">
                <AddExercises
                  selectedExercises={selectedExercises}
                  setSelectedExercises={(selected) => setSelectedExercises((s) => [...s, selected])}
                />
                <button
                  onClick={onHandleClose}
                  className="rounded-lg bg-red-200 py-2 px-4 text-base font-semibold text-red-500"
                >
                  Cancel Workout
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default WorkoutModal;
