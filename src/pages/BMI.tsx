import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUndo, FaVenus, FaMars } from "react-icons/fa";
import Header from "../components/Header";

interface BMIInfographicProps {
  bmi: number;
  isDark: boolean;
}

interface BMICalculatorProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

interface BMIResult {
  bmi: string;
  category: string;
}

const containerVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const BMIInfographic: React.FC<BMIInfographicProps> = ({ bmi, isDark }) => {
  const getGradientBar = () => {
    const bmiValue = bmi || 0;
    const bmiPosition = Math.min(Math.max(bmiValue, 15), 35);
    const positionPercent = ((bmiPosition - 15) / 20) * 100;

    return (      <div className={`p-4 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-gray-100"}`}>
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 h-4 w-1 bg-black"
            style={{ left: `${positionPercent}%` }}
          />
          <div
            className={`flex justify-between text-xs mt-2 px-1 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <span>15</span>
            <span>25</span>
            <span>35</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={childVariants}
      className="flex flex-col items-center gap-2 w-full"
    >
      {getGradientBar()}
    </motion.div>
  );
};

const BMICalculator: React.FC<BMICalculatorProps> = ({ isDark, toggleDarkMode }) => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<BMIResult>({ bmi: "0", category: "N/A" });

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setResult({ bmi: "0", category: "N/A" });
      return;
    }

    const heightInM = heightNum / 100;
    const bmi = (weightNum / (heightInM * heightInM)).toFixed(2);
    let category = "";

    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) category = "Underweight";
    else if (bmiNum < 25) category = "Normal";
    else if (bmiNum < 30) category = "Overweight";
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
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto p-10"
    >
      <motion.div
        variants={containerVariants}
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
        <motion.div variants={childVariants} className="flex flex-col gap-3">
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
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={result.bmi}
            variants={childVariants}
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
            </h3>            <div className="flex flex-col items-center gap-4 text-base">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                    {result.bmi}
                  </span>
                </div>
                <div className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
                  {result.category}
                </div>
              </div>
              <BMIInfographic bmi={parseFloat(result.bmi)} isDark={isDark} />
            </div>
          </motion.div>
        </AnimatePresence>
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
