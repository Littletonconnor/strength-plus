import React, { useState } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Dialog, Combobox, Transition } from '@headlessui/react';

// todo(connor): Move to Db.
export const Workouts = [
  { id: 1, name: 'Bench press' },
  { id: 2, name: 'Squat' },
  { id: 3, name: 'Incline Bench Press' },
  { id: 4, name: 'Bicep Curls' },
  { id: 5, name: 'Hack Squat' },
  { id: 6, name: 'Lat Pull Downs' },
];

export type Workout = { id: number; name: string };

interface Props {
  selectedExercises: Workout[];
  setSelectedExercises: (selected: Workout) => void;
}

function AddExercises({ selectedExercises, setSelectedExercises }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Workout | null>(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const filteredWorkouts =
    query === ''
      ? Workouts
      : Workouts.filter((person) =>
          person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const onChangeSelected = (item: Workout) => {
    setSelected(item);
    setSelectedExercises(item);
  };

  const onHandleClose = () => {
    setSelected(null);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="rounded-lg bg-primary py-2 px-4 text-base font-semibold text-white">
        Add Workouts
      </button>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="relative isolate z-10" onClose={() => setOpen(false)}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-96 w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add Exercises
                  </Dialog.Title>
                  <div className="mt-2">
                    <Combobox value={selected} onChange={onChangeSelected}>
                      <div className="relative mt-1">
                        <div className="relative w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className="w-full border border-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            placeholder="Select a value"
                            displayValue={(exercise: any) => (exercise ? exercise.name : null)}
                            onChange={(event) => setQuery(event.target.value)}
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQuery('')}
                        >
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredWorkouts.length === 0 && query !== '' ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                              </div>
                            ) : (
                              filteredWorkouts.map((workout) => (
                                <Combobox.Option
                                  key={workout.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-palePrimary text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={workout}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                        {workout.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-primary'
                                          }`}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>
                  <div className="mt-4 flex flex-col space-y-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-palePrimary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Add ({selectedExercises.length})
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
        </Dialog>
      </Transition>
    </>
  );
}
export default AddExercises;
