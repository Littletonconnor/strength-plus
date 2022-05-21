import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onCancelComplete: (ovveride: boolean) => void;
}

function CancelWorkout({ open, onClose, onCancelComplete }: Props) {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="relative isolate z-10" onClose={onClose}>
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
                <Dialog.Panel className="min-h-52 flex w-full max-w-md transform flex-col rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Cancel Workout?
                  </Dialog.Title>
                  <p className="leading-tight">
                    Are you sure you want to cancel this workout? All progress will be lost.
                  </p>
                  <button
                    onClick={() => onCancelComplete(true)}
                    className="mt-8 rounded-lg bg-red-500 py-2 px-4 text-base font-semibold text-white"
                  >
                    Cancel Workout
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Resume
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </>
      </Dialog>
    </Transition>
  );
}

export default CancelWorkout;
