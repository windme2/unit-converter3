import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary ${
        isDark
          ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </motion.button>
  );
};

export default ThemeToggle;
