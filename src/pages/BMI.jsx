import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUndo, FaVenus, FaMars } from "react-icons/fa";
import Header from "../components/Header";

const BMIInfographic = ({ bmi, isDark }) => {
  const getGradientBar = () => {
    const bmiPosition = Math.min(Math.max(bmi, 15), 35); // Limit BMI range 15-35 for display
    const positionPercent = ((bmiPosition - 15) / 20) * 100; // Map to 0-100%

    return (
      <div className="relative w-full h-4 bg-gray-200 rounded-full">
        <svg width="100%" height="16">
          <defs>
            <linearGradient id="bmiGradient">
              <stop offset="0%" stopColor={isDark ? "#4ade80" : "#22c55e"} />
              <stop offset="50%" stopColor={isDark ? "#fde047" : "#facc15"} />
              <stop offset="100%" stopColor={isDark ? "#f87171" : "#ef4444"} />
            </linearGradient>
          </defs>
          <rect width="100%" height="16" fill="url(#bmiGradient)" rx="8" />
        </svg>
        <div
          className="absolute top-0 h-4 w-1 bg-black"
          style={{ left: `${positionPercent}%` }}
        />
        <div
          className={`flex justify-between text-xs mt-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span>15</span>
          <span>25</span>
          <span>35</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {bmi !== "0" && getGradientBar()}
    </div>
  );
};

const BMICalculator = ({ isDark, toggleDarkMode }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState({ bmi: "0", category: "N/A" });

  const calculateBMI = () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setResult({ bmi: "0", category: "N/A" });
      return;
    }

    const heightInM = height / 100;
    const bmi = (weight / (heightInM * heightInM)).toFixed(2);
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    setResult({ bmi, category });
  };

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("male");
    setResult({ bmi: "0", category: "N/A" });
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
          title="BMI Calculator"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-4"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Gender
              </label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setGender("male")}
                  className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                    gender === "male"
                      ? isDark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-400 text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <FaMars />
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex-1 p-3 rounded-lg flex items-center justify-center gap-2 ${
                    gender === "female"
                      ? isDark
                        ? "bg-pink-600 text-white"
                        : "bg-pink-400 text-white"
                      : isDark
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <FaVenus />
                  Female
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Age (years)"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Height (cm)"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Weight (kg)"
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
            BMI Calculation Result
          </h3>
          <div className="flex flex-col gap-2 text-base">
            <p>
              <span className={isDark ? "text-white" : "text-black"}>BMI:</span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {result.bmi}
              </span>
            </p>
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Category:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {result.category}
              </span>
            </p>
            <BMIInfographic bmi={parseFloat(result.bmi)} isDark={isDark} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
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

export default BMICalculator;
