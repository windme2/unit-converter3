import { FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SwapButton = ({ onClick, isDark }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-2.5 rounded-full text-white transition focus:ring-2 focus:ring-primary ${
        isDark ? "bg-primary hover:bg-blue-700" : "bg-primary hover:bg-blue-600"
      }`}
      aria-label="Swap units"
    >
      <FaExchangeAlt size={16} />
    </motion.button>
  );
};

export default SwapButton;
