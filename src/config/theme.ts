import type { Variants, Transition } from "framer-motion";

export const transitions = {
  default: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
  fast: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
  slow: {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.default,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.fast,
} as const;
