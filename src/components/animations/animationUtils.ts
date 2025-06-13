// Animation variants for common animations
export const fadeIn = (delay: number = 0, duration: number = 0.6) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: 'easeOut',
    },
  },
});

export const slideUp = (delay: number = 0, duration: number = 0.6, distance: number = 50) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

export const slideDown = (delay: number = 0, duration: number = 0.6, distance: number = 50) => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

export const slideLeft = (delay: number = 0, duration: number = 0.6, distance: number = 50) => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

export const slideRight = (delay: number = 0, duration: number = 0.6, distance: number = 50) => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

export const scale = (delay: number = 0, duration: number = 0.6, initialScale: number = 0.9) => ({
  hidden: { opacity: 0, scale: initialScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

// Staggered children animation
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Text animation for revealing text character by character
export const textReveal = (delay: number = 0, staggerChildren: number = 0.02) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: delay,
    },
  },
});

export const textCharacter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};