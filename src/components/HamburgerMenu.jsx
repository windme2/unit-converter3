import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaCalculator,
  FaMoneyBillWave,
  FaWeight,
  FaRuler,
  FaCube,
  FaSquare,
  FaHeartbeat,
  FaPercent,
  FaHistory,
} from "react-icons/fa";

const HamburgerMenu = ({ isDark, toggleMenu, isOpen }) => {
  const location = useLocation();

  const getIcon = (type) => {
    switch (type) {
      case "calculator":
        return <FaCalculator />;
      case "currency":
        return <FaMoneyBillWave />;
      case "weight":
        return <FaWeight />;
      case "length":
        return <FaRuler />;
      case "volume":
        return <FaCube />;
      case "area":
        return <FaSquare />;
      case "bmi":
        return <FaHeartbeat />;
      case "loan":
        return <FaPercent />;
      case "percentage":
        return <FaPercent />;
      case "history":
        return <FaHistory />;
      default:
        return null;
    }
  };

  const menuItems = [
    { path: "/calculator", label: "Calculator", icon: getIcon("calculator") },
    {
      path: "/currency",
      label: "Currency Converter",
      icon: getIcon("currency"),
    },
    { path: "/weight", label: "Weight Converter", icon: getIcon("weight") },
    { path: "/length", label: "Length Converter", icon: getIcon("length") },
    { path: "/volume", label: "Volume Converter", icon: getIcon("volume") },
    { path: "/area", label: "Area Converter", icon: getIcon("area") },
    { path: "/bmi", label: "BMI Calculator", icon: getIcon("bmi") },
    { path: "/loan", label: "Loan Interest Calculator", icon: getIcon("loan") },
    {
      path: "/percentage",
      label: "Percentage Calculator",
      icon: getIcon("percentage"),
    },
    { path: "/history", label: "History", icon: getIcon("history") },
  ];

  return (
    <motion.div
      className={`fixed top-0 left-0 h-full w-64 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } shadow-lg z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleMenu} className="text-2xl">
          ✕
        </button>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => {
              toggleMenu();
            }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? isDark
                  ? "bg-primary text-white"
                  : "bg-primary text-white"
                : isDark
                ? "hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default HamburgerMenu;
