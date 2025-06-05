import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const buttonVariants = {
  rest: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const iconVariants = {
  initial: {
    rotate: -180,
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    rotate: 180,
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-primary ${
        isDark
          ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "moon" : "sun"}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
