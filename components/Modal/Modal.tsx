import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { reset, set } from './utils';

const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1],
};

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <Dialog onClose={onClose} open className="fixed inset-0 isolate z-10">
      <Dialog.Overlay
        as={motion.div}
        variants={{
          open: {
            opacity: 1,
            transition: {
              ease: TRANSITIONS.EASE,
              duration: TRANSITIONS.DURATION,
            },
          },
          closed: {
            opacity: 0,
            transition: {
              ease: TRANSITIONS.EASE,
              duration: TRANSITIONS.DURATION,
            },
          },
        }}
        initial="closed"
        animate="open"
        exit="closed"
        className="fixed inset-0 bg-black/40"
        onAnimationStart={animationStart}
        onAnimationComplete={animationStop}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{
          y: '10%',
          transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
        }}
        exit={{
          y: '100%',
          transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
        }}
        className="top-safe-top flex h-full w-full flex-col rounded-t-xl bg-white shadow-xl"
      >
        {children}
      </motion.div>
    </Dialog>
  );
}

function animationStart(variant: string) {
  if (variant === 'open') {
    set(document.documentElement, {
      background: 'black',
      height: '100vh',
    });
    set(document.body, { position: 'fixed', inset: '0' });
    set(document.querySelector('header'), { position: 'absolute' });
    set(document.querySelector('#__next'), {
      borderRadius: '8px',
      overflow: 'hidden',
      transform: 'scale(0.93) translateY(calc(env(safe-area-inset-top) + 8px))',
      transformOrigin: 'top',
      transitionProperty: 'transform',
      transitionDuration: `${TRANSITIONS.DURATION}`,
      transitionTimingFunction: `cubix-bezier${TRANSITIONS.EASE.join(',')}`,
    });
  } else {
    reset(document.querySelector('#__next'), 'transform');
  }
}

function animationStop(variant: string) {
  if (variant === 'closed') {
    reset(document.documentElement);
    reset(document.body);
    reset(document.querySelector('header'));
    reset(document.querySelector('#__next'));
  }
}

export default Modal;
