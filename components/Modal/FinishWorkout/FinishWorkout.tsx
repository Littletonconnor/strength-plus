import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onFinishComplete: () => void;
}

function FinishWorkout({ open, onClose, onFinishComplete }: Props) {
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
                <Dialog.Panel className="min-h-52 flex w-full max-w-md transform flex-col space-y-4 rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <span role="img" aria-label="party popper">
                    🎉
                  </span>
                  <Dialog.Title as="h1" className="text-lg font-medium leading-6 text-gray-900">
                    Finish Workout?
                  </Dialog.Title>
                  <p className="leading-tight">
                    All invalid or empty sets will be removed. All valid sets will be marked as complete.
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={onClose}
                      type="button"
                      className="flex-1 justify-center rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => onFinishComplete()}
                      className="flex-1 rounded-md bg-green-500 py-2 px-4 text-base font-semibold text-white"
                    >
                      Finish
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </>
      </Dialog>
    </Transition>
  );
}

export default FinishWorkout;
