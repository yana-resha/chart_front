export const veilVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export const sheetVariants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: '100%', transition: { duration: 0.22 } },
}

export const desktopModalVariants = {
  hidden: { opacity: 0, y: '2%' },
  visible: { opacity: 1, y: '0', transition: { duration: 0.4 } },
  exit: { opacity: 0, y: '-2%', transition: { duration: 0.1 } },
}

export const popoverVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 4,
    transition: { duration: 0.1 },
  },
}
