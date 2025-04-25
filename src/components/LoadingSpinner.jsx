import { motion } from "framer-motion";

const LoadingSpinner = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg z-10 ${
        isDark ? "bg-black/50" : "bg-white/50"
      }`}
    >
      <div className="spinner"></div>
    </motion.div>
  );
};

export default LoadingSpinner;
