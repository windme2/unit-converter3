import { FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface SwapButtonProps {
  onClick: () => void;
  isDark: boolean;
}

const buttonVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const iconVariants = {
  rest: {
    rotate: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
  hover: {
    rotate: 180,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, isDark }) => {
  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`p-2.5 rounded-full text-white transition-colors focus:ring-2 focus:ring-primary ${
        isDark ? "bg-primary hover:bg-blue-700" : "bg-primary hover:bg-blue-600"
      }`}
      aria-label="Swap units"
    >
      <motion.div variants={iconVariants}>
        <FaExchangeAlt size={16} />
      </motion.div>
    </motion.button>
  );
};

export default SwapButton;
