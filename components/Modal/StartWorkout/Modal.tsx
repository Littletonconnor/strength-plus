import { CheckIcon, DotsHorizontalIcon } from '@heroicons/react/solid';
import Modal from 'components/Modal';
import AddExercise from 'components/Modal/AddExercise';
import { Workout } from 'components/Modal/utils';
import Spacer from 'components/Spacer';
import { Start } from 'components/Svg';
import useTimer from 'lib/hooks/useTimer';
import React, { useState } from 'react';
import http from 'lib/http';
import qs from 'query-string';
import Spinner from 'components/Spinner';
import { v4 } from 'uuid';
import cx from 'classnames';
import CancelWorkout from 'components/Modal/CancelWorkout';
import FinishWorkout from '../FinishWorkout';

function genEmptySet(id: string) {
  return { id: v4(), lbs: '', reps: '', exerciseId: id };
}

function genEmptyExerciseStat(exerciseId: number) {
  const id = v4();
  return { id, exerciseId: exerciseId, sets: [genEmptySet(id)] };
}

function maybeAddEmptySets(exercises: any) {
  return exercises.map((exercise: any) => ({
    ...exercise,
    exerciseStats: exercise.exerciseStats.length > 0 ? exercise.exerciseStats : [genEmptyExerciseStat(exercise.id)],
  }));
}

interface Props {
  closeModal: () => void;
}

function WorkoutModal({ closeModal }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openFinishModal, setOpenFinishModal] = useState(false);

  const time = 1; // useTimer(open);

  const openModal = () => setOpen(true);

  const onHandleClose = (override = false) => {
    if (selectedExercises.length > 0 && !override) {
      setOpenCancelModal(true);
    } else {
      setSelectedExercises([]);
      closeModal();
    }
  };

  const onAddSet = (selectedExercise: any) => {
    const selectedIdx = selectedExercises.findIndex((s) => selectedExercise.id === s.id);
    setSelectedExercises((exercises: any) => {
      const newExercise = exercises[selectedIdx];
      const exerciseStats = newExercise.exerciseStats[0];
      exerciseStats.sets = [...exerciseStats.sets, genEmptySet(exerciseStats.id)];
      return [...exercises];
    });
  };

  const onRemoveSet = (selectedExercise: any) => {
    const selectedIdx = selectedExercises.findIndex((s) => selectedExercise.id === s.id);
    setSelectedExercises((exercises: any) => {
      const newExercise = exercises[selectedIdx];
      const exerciseStats = newExercise.exerciseStats[0];
      if (exerciseStats.sets.length > 1) {
        exerciseStats.sets = [...exerciseStats.sets.slice(0, -1)];
      }
      return [...exercises];
    });
  };

  const onChangeSetLbs = (e: React.ChangeEvent<HTMLInputElement>, selectedExercise: any, set: any) => {
    setSelectedExercises((exercises: any) => {
      const selectedExerciseId = exercises.findIndex((s: any) => selectedExercise.id === s.id);
      const selectedSetId = exercises[selectedExerciseId].exerciseStats[0].sets.findIndex((s: any) => set.id === s.id);
      exercises[selectedExerciseId].exerciseStats[0].sets[selectedSetId].new_lbs = Number(e.target.value);
      return [...exercises];
    });
  };

  const onChangeSetReps = (e: React.ChangeEvent<HTMLInputElement>, selectedExercise: any, set: any) => {
    setSelectedExercises((exercises: any) => {
      const selectedExerciseId = exercises.findIndex((s: any) => selectedExercise.id === s.id);
      const selectedSetId = exercises[selectedExerciseId].exerciseStats[0].sets.findIndex((s: any) => set.id === s.id);
      exercises[selectedExerciseId].exerciseStats[0].sets[selectedSetId].new_reps = Number(e.target.value);
      return [...exercises];
    });
  };

  const onCompleteSet = (selectedExercise: any, set: any) => {
    setSelectedExercises((exercises: any) => {
      const selectedExerciseId = exercises.findIndex((s: any) => selectedExercise.id === s.id);
      const selectedSetId = exercises[selectedExerciseId].exerciseStats[0].sets.findIndex((s: any) => set.id === s.id);
      const selectedSet = exercises[selectedExerciseId].exerciseStats[0].sets[selectedSetId];
      const isNewLpsFilledOut = Boolean(selectedSet.new_lbs);
      const isNewRepsFilledOut = Boolean(selectedSet.new_reps);
      selectedSet.new_lbs_invalid = !isNewLpsFilledOut;
      selectedSet.new_reps_invalid = !isNewRepsFilledOut;
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

  const onFinishWorkout = () => {
    const workoutIsUnfinished =
      !selectedExercises.length ||
      selectedExercises.some((exercise) => {
        return exercise.exerciseStats[0].sets.some((set: any) => {
          const isLpsInvalid = typeof set.new_lbs === 'undefined';
          const isRepsInvalid = typeof set.new_reps === 'undefined';
          return isLpsInvalid && isRepsInvalid;
        });
      });

    if (workoutIsUnfinished) {
      setOpenCancelModal(true);
    } else {
      setOpenFinishModal(true);
    }
  };

  const onFinishComplete = async () => {
    const newExercises = selectedExercises.map((exercise) => {
      return {
        id: exercise.id,
        created_at: exercise.created_at,
        name: exercise.name,
        exerciseStats: exercise.exerciseStats.map((stat: any) => {
          return {
            id: stat.id,
            created_at: stat.created_at,
            exerciseId: stat.exerciseId,
            sets: stat.sets.map((set: any) => {
              return {
                id: set.id,
                created_at: set.created_at,
                lbs: set.new_lbs,
                reps: set.new_reps,
              };
            }),
          };
        }),
      };
    });
    http.post('http://localhost:3000/api/finish-workout', {
      exercises: newExercises,
    });
  };

  console.log({ selectedExercises });

  return (
    <>
      <Modal onClose={closeModal}>
        <div className="flex flex-col py-3">
          <div className="flex justify-between px-3">
            <div className="flex items-center space-x-4">
              <button>
                <Start className="h-full w-6 items-baseline text-gray-500" />
              </button>
              <span className="text-xs font-semibold text-gray-500">{time}</span>
            </div>
            <button
              onClick={onFinishWorkout}
              className="rounded-lg bg-primary py-2 px-4 text-sm font-semibold text-white"
            >
              Finish
            </button>
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
                      <div className="flex items-center px-3">
                        <button className="text-lg font-bold text-gray-700">{selectedExercise.name}</button>
                        <button className="ml-auto">
                          <DotsHorizontalIcon className="h-5 w-5 fill-primary" />
                        </button>
                      </div>
                      <Spacer size={32 / 2} />
                      <div className="grid grid-cols-8 items-center justify-items-center gap-2 px-3">
                        <p className="col-span-1">Set</p>
                        <p className="col-span-2">Previous</p>
                        <p className="col-span-2">lbs</p>
                        <p className="col-span-2">Reps</p>
                        <button className="col-span-1 ml-1 py-1 px-2">
                          <CheckIcon className="h-5 w-5 text-primary" />
                        </button>
                      </div>
                      <Spacer size={32 / 4} />
                      {selectedExercise.exerciseStats[0].sets.map((set: any, i: number) => {
                        const isLpsValid = typeof set.new_lbs_invalid !== 'undefined' && !set.new_lbs_invalid;
                        const isRepsValid = typeof set.new_reps_invalid !== 'undefined' && !set.new_reps_invalid;

                        return (
                          <React.Fragment key={i}>
                            <div
                              className={cx({
                                'bg-green-300': isLpsValid && isRepsValid,
                              })}
                              key={i}
                            >
                              <div className="grid grid-cols-8 items-center gap-2 px-3 py-1 text-center">
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
                                  onChange={(e) => onChangeSetLbs(e, selectedExercise, set)}
                                  type="number"
                                  className={cx('col-span-2 w-full rounded-md text-center font-semibold', {
                                    'bg-red-200': set.new_lbs_invalid,
                                    'bg-gray-200': !set.new_lbs_invalid,
                                  })}
                                />
                                <input
                                  placeholder={set.reps || ''}
                                  onChange={(e) => onChangeSetReps(e, selectedExercise, set)}
                                  type="number"
                                  className={cx('col-span-2 w-full rounded-md text-center font-semibold', {
                                    'bg-red-200': set.new_reps_invalid,
                                    'bg-gray-200': !set.new_reps_invalid,
                                  })}
                                />
                                <button
                                  onClick={() => onCompleteSet(selectedExercise, set)}
                                  className="col-span-1 py-1 px-2"
                                >
                                  <CheckIcon className="h-5 w-5 text-primary" />
                                </button>
                              </div>
                            </div>
                            <Spacer size={32 / 8} />
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <Spacer size={32 / 4} />
                    <button
                      onClick={() => onAddSet(selectedExercise)}
                      className="mx-3 rounded-lg bg-gray-300 py-[1px] px-4 text-base font-semibold text-gray-600"
                    >
                      Add set
                    </button>
                    <Spacer size={32 / 4} />
                    <button
                      onClick={() => onRemoveSet(selectedExercise)}
                      className="mx-3 rounded-lg bg-red-200 py-[1px] px-4 text-base font-semibold text-red-500"
                    >
                      Remove set
                    </button>
                    <Spacer size={32} />
                  </React.Fragment>
                );
              })
            : null}
          <Spacer size={32} />
          <button
            onClick={openModal}
            className="mx-3 rounded-lg bg-primary py-2 px-4 text-base font-semibold text-white"
          >
            Add Exercises
          </button>
          <Spacer size={32 / 4} />
          <button
            onClick={() => onHandleClose()}
            className="mx-3 rounded-lg bg-red-200 py-2 px-4 text-base font-semibold text-red-500"
          >
            Cancel Workout
          </button>
        </div>
      </Modal>
      <AddExercise closeModal={() => setOpen(false)} open={open} setSelectedExercises={onHandleSetExercises} />
      <CancelWorkout
        open={openCancelModal}
        onCancelComplete={onHandleClose}
        onClose={() => setOpenCancelModal(false)}
      />
      <FinishWorkout
        open={openFinishModal}
        onFinishComplete={onFinishComplete}
        onClose={() => setOpenFinishModal(false)}
      />
    </>
  );
}

export default WorkoutModal;
