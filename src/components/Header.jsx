import { FaHome, FaBars, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = ({ title, isDark, toggleDarkMode, className }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex justify-between items-center ${className || ""}`}>
      <h1
        className={`text-xl font-semibold bg-clip-text text-transparent ${
          isDark
            ? "bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-300"
            : "bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500"
        }`}
      >
        {title}
      </h1>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.3,
          }}
          onClick={() => navigate("/")}
          className={`p-2 rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isDark
              ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-800 hover:shadow-lg"
          }`}
          aria-label="Home"
        >
          <FaHome size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.3,
          }}
          onClick={() => navigate("/unitmenu")}
          className={`p-2 rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isDark
              ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-gray-800 hover:shadow-lg"
          }`}
          aria-label="Menu"
        >
          <FaBars size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.3,
          }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isDark
              ? "text-gray-400 hover:bg-gray-700 hover:text-yellow-400 hover:shadow-lg"
              : "text-gray-600 hover:bg-gray-200 hover:text-yellow-400 hover:shadow-lg"
          }`}
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
