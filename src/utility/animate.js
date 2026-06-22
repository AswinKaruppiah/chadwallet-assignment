export const animateFadeYVariants = ({ opacityValue = 1, delay = 0 } = {}) => ({
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: opacityValue,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
    },
  },
});
