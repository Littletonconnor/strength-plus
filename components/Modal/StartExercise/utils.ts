export const Transitions = {
  DURATION: 0.3,
  EASE: [0.32, 0.72, 0, 1],
};

export const overlayVariants = {
  open: {
    opacity: 1,
    transition: {
      ease: Transitions.EASE,
      duration: Transitions.DURATION,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      ease: Transitions.EASE,
      duration: Transitions.DURATION,
    },
  },
};

export const overlayContentVariants = {
  open: {
    y: '10%',
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  closed: {
    y: '100%',
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};
