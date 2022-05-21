import { Dialog, Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import http from 'lib/http';
import cx from 'classnames';
import Spinner from 'components/Spinner';

export type Workout = { id: number; name: string };

interface Props {
  open: boolean;
  closeModal: () => void;
  setSelectedExercises: (selected: Workout[]) => void;
}

function AddExercises({ open, closeModal, setSelectedExercises }: Props) {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState<any>([]);
  const [selected, setSelected] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const onHandleSelected = (newItem: any) => {
    const isAlreadySelected = selected.find((s) => s.name === newItem.name);
    if (isAlreadySelected) {
      setSelected((prevSelected) => {
        return prevSelected.filter((s) => s.id !== isAlreadySelected.id);
      });
    } else {
      setSelected((prevSelected) => [...prevSelected, newItem]);
    }
  };

  const onHandleClose = () => {
    setSelected([]);
    closeModal();
  };

  const onHandleAdd = () => {
    setSelectedExercises(selected);
    onHandleClose();
  };

  const onHandleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    async function fetchExercises() {
      try {
        setLoading(true);
        const response = await http.get('http://localhost:3000/api/exercises');
        setExercises(response.exercises);
      } catch (error) {
        // todo(connor): Add actual error handling
        console.log(error);
      }
      setLoading(false);
    }
    fetchExercises();
  }, []);

  const filteredWorkouts =
    query === ''
      ? exercises
      : exercises.filter((exercise: any) =>
          exercise.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="relative isolate z-10" onClose={onHandleClose}>
          {loading ? (
            <div className="flex justify-center">
              <Spinner className="h-8 w-8 text-primary" />
            </div>
          ) : (
            <>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="flex h-[600px] w-full max-w-md transform flex-col rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="px-6 pt-6 text-lg font-medium leading-6 text-gray-900">
                        Add Exercises
                      </Dialog.Title>
                      <div className="mt-4 mb-8 w-full px-6">
                        <label htmlFor="search" className="text-gray-600">
                          Search for a workout...
                        </label>
                        <input
                          onChange={onHandleQuery}
                          id="search"
                          type="text"
                          className="w-full rounded-md border border-gray-200 py-2 px-4 focus:outline-2 focus:outline-primary"
                        />
                      </div>
                      <div className="my-4 overflow-scroll px-6">
                        <ul className="space-y-2">
                          {filteredWorkouts.map((exercise: any) => {
                            return (
                              <li
                                className={cx('rounded-lg border border-gray-200 py-3 px-2', {
                                  'border-primary': Boolean(selected.find((s) => s.name === exercise.name)),
                                })}
                                key={exercise.id}
                              >
                                <button className="w-full text-left" onClick={() => onHandleSelected(exercise)}>
                                  {exercise.name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="mt-auto flex w-full flex-col space-y-2 px-6 pb-6">
                        <button
                          disabled={selected.length === 0}
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-palePrimary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          onClick={onHandleAdd}
                        >
                          Add ({selected.length})
                        </button>
                        <button
                          onClick={onHandleClose}
                          className="rounded-lg bg-red-200 py-2 px-4 text-base font-semibold text-red-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </>
          )}
        </Dialog>
      </Transition>
    </>
  );
}
export default AddExercises;
