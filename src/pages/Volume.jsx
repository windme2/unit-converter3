import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUndo, FaExchangeAlt } from "react-icons/fa";
import { volumeConversionRates, unitLabels } from "../utils/constants";
import Header from "../components/Header";

const VolumeConverter = ({ isDark, toggleDarkMode }) => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("l");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!value || value <= 0) {
      setResult(null);
      return;
    }
    const convertedValue = (
      value * volumeConversionRates[fromUnit][toUnit]
    ).toFixed(2);
    setResult(convertedValue);
  };

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit]);

  const resetForm = () => {
    setValue("");
    setResult(null);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (value && value > 0) convert();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto p-10"
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
          title="Volume Converter"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-2"
        />
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className={`p-3 rounded-lg w-full text-sm font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } border focus:ring-2 focus:ring-primary pr-10`}
            >
              {Object.keys(volumeConversionRates).map((unit) => (
                <option key={unit} value={unit}>
                  {unitLabels.volume[unit].full} (
                  {unitLabels.volume[unit].short})
                </option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={swapUnits}
            className={`p-2.5 rounded-full text-white transition focus:ring-2 focus:ring-primary ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            aria-label="Swap units"
          >
            <FaExchangeAlt size={16} />
          </motion.button>
          <div className="flex-1">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className={`p-3 rounded-lg w-full text-sm font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } border focus:ring-2 focus:ring-primary pr-10`}
            >
              {Object.keys(volumeConversionRates).map((unit) => (
                <option key={unit} value={unit}>
                  {unitLabels.volume[unit].full} (
                  {unitLabels.volume[unit].short})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`p-3 rounded-lg w-full text-base font-semibold ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
              } border focus:ring-2 focus:ring-primary`}
              placeholder="0.00"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={result ? result : "0.00"}
              readOnly
              className={`p-3 rounded-lg w-full text-lg font-semibold text-right ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } border cursor-not-allowed`}
            />
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

export default VolumeConverter;
