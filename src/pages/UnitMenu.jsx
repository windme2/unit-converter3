import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaRuler,
  FaSquare,
  FaCube,
  FaWeight,
  FaBalanceScale,
  FaMoneyBillWave,
  FaPercentage,
  FaCalculator,
} from "react-icons/fa";
import Header from "../components/Header";

const categories = [
  {
    key: "currency",
    icon: <FaDollarSign />,
    label: "Currency",
    path: "/currency",
  },
  {
    key: "length",
    icon: <FaRuler />,
    label: "Length",
    path: "/length",
  },
  { key: "area", icon: <FaSquare />, label: "Area", path: "/area" },
  {
    key: "volume",
    icon: <FaCube />,
    label: "Volume",
    path: "/volume",
  },
  {
    key: "weight",
    icon: <FaWeight />,
    label: "Weight",
    path: "/weight",
  },
  {
    key: "bmi",
    icon: <FaBalanceScale />,
    label: "BMI Calculator",
    path: "/bmi",
  },
  {
    key: "loan",
    icon: <FaMoneyBillWave />,
    label: "Loan Interest",
    path: "/loan",
  },
  {
    key: "percentage",
    icon: <FaPercentage />,
    label: "Percentage",
    path: "/percentage",
  },
  {
    key: "tax",
    icon: <FaCalculator />,
    label: "Tax Calculator",
    path: "/tax",
  },
];

const UnitMenu = ({ isDark, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 flex flex-col gap-6 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto p-6 md:p-8 lg:p-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className={`card-container p-6 rounded-lg flex flex-col gap-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header
          title="Unit Converter"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-2"
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center rounded-2xl p-3 shadow-sm min-h-[100px] transition-all duration-300 ease-in-out ${
                isDark
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div
                className={`text-3xl ${
                  isDark
                    ? "text-white hover:text-teal-300"
                    : "text-black hover:text-teal-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="mt-2 text-base font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UnitMenu;
