export const Transitions = {
  DURATION: 0.3,
  EASE: [0.32, 0.72, 0, 1],
};

export type Workout = { id: number; name: string };

export type SelectedWorkout = Workout & {
  sets: any;
};

const cache = new Map();

export function set(el: any, styles: any) {
  const originalStyles = {} as any;

  Object.entries(styles).forEach(([key, value]) => {
    originalStyles[key] = el.style[key];
    el.style[key] = value;
  });

  cache.set(el, originalStyles);
}

export function reset(el: any, prop?: any) {
  const originalStyles = cache.get(el);

  if (prop) {
    el.style[prop] = originalStyles[prop];
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      el.style[key] = value;
    });
  }
}
