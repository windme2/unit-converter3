import { motion, AnimatePresence } from "framer-motion";

interface LoadingSpinnerProps {
  isDark: boolean;
}

const spinnerVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isDark }) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg z-10 ${
          isDark ? "bg-black/50" : "bg-white/50"
        }`}
      >
        <motion.div
          className={`w-10 h-10 border-3 border-primary rounded-full ${
            isDark ? "border-blue-400" : "border-blue-500"
          }`}
          style={{
            borderTopColor: "transparent",
            borderRightColor: "transparent",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingSpinner;
