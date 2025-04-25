import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUndo } from "react-icons/fa";
import Header from "../components/Header";

const PercentageCalculator = ({ isDark, toggleDarkMode }) => {
  const [whole, setWhole] = useState("");
  const [part, setPart] = useState("");
  const [result, setResult] = useState("0");

  const calculatePercentage = () => {
    if (!whole || !part || whole <= 0 || part <= 0) {
      setResult("0");
      return;
    }

    const calculatedResult = ((part / whole) * 100).toFixed(2);
    setResult(calculatedResult);
  };

  useEffect(() => {
    calculatePercentage();
  }, [whole, part]);

  const resetForm = () => {
    setWhole("");
    setPart("");
    setResult("0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto p-10"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className={`card-container p-6 rounded-lg flex flex-col gap-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header
          title="Percentage Calculator"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-4"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Total Amount"
                aria-label="Total Amount"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Partial Amount"
                aria-label="Partial Amount"
              />
            </div>
          </div>
        </div>
        <div
          className={`mt-6 p-4 rounded-lg shadow-sm ${
            isDark ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-3 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Percentage Calculation Result
          </h3>
          <div className="flex flex-col gap-2 text-base">
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Result:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {result}%
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetForm}
            className={`p-2.5 rounded-lg text-white text-sm flex items-center gap-1 transition ${
              isDark
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
            aria-label="Reset form"
          >
            <FaUndo size={16} />
            Reset
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PercentageCalculator;
