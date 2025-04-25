import { useState } from "react";
import { motion } from "framer-motion";
import { FaUndo } from "react-icons/fa";
import { formatNumber } from "../utils/helpers";
import Header from "../components/Header";

const LoanInterestCalculator = ({ isDark, toggleDarkMode }) => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("months");
  const [result, setResult] = useState({
    interest: "0",
    total: "0",
    monthlyPayment: "0",
    yearlyPayment: "0",
    timeInMonths: "0",
    timeInYears: "0",
  });

  const calculateInterest = () => {
    if (
      !principal ||
      !rate ||
      !time ||
      principal <= 0 ||
      rate <= 0 ||
      time <= 0
    ) {
      setResult({
        interest: "0",
        total: "0",
        monthlyPayment: "0",
        yearlyPayment: "0",
        timeInMonths: "0",
        timeInYears: "0",
      });
      return;
    }

    const timeInYears =
      timeUnit === "years" ? parseFloat(time) : parseFloat(time) / 12;
    const timeInMonths =
      timeUnit === "years" ? parseFloat(time) * 12 : parseFloat(time);

    const interest = (principal * rate * timeInYears) / 100;
    const total = parseFloat(principal) + interest;

    const monthlyPayment =
      timeInMonths > 0 ? (total / timeInMonths).toFixed(2) : 0;
    const yearlyPayment =
      timeInYears > 0 ? (total / timeInYears).toFixed(2) : 0;

    setResult({
      interest: interest.toFixed(2),
      total: total.toFixed(2),
      monthlyPayment,
      yearlyPayment,
      timeInMonths,
      timeInYears,
    });
  };

  const resetForm = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTimeUnit("months");
    setResult({
      interest: "0",
      total: "0",
      monthlyPayment: "0",
      yearlyPayment: "0",
      timeInMonths: "0",
      timeInYears: "0",
    });
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
          title="Loan Interest Calculator"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-4"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                onBlur={calculateInterest}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Loan Amount"
                aria-label="Loan Amount"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                onBlur={calculateInterest}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Interest Rate (%)"
                aria-label="Interest Rate"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onBlur={calculateInterest}
                className={`p-3 rounded-lg w-full text-base font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary`}
                placeholder={`Term (${
                  timeUnit === "years" ? "Years" : "Months"
                })`}
                aria-label="Loan Term"
              />
            </div>
            <div className="flex-1">
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                onBlur={calculateInterest}
                className={`p-3 rounded-lg w-full text-sm font-medium ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                } border focus:ring-2 focus:ring-primary pr-10`}
                aria-label="Time Unit"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
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
            Loan Calculation Result
          </h3>
          <div className="flex flex-col gap-2 text-base">
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Interest:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {formatNumber(result.interest)}
              </span>
            </p>
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Total:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {formatNumber(result.total)}
              </span>
            </p>
            {timeUnit === "months" && (
              <p>
                <span className={isDark ? "text-white" : "text-black"}>
                  Monthly:
                </span>{" "}
                <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                  {formatNumber(result.monthlyPayment)} (
                  {formatNumber(result.timeInMonths)} months)
                </span>
              </p>
            )}
            {timeUnit === "years" && (
              <p>
                <span className={isDark ? "text-white" : "text-black"}>
                  Yearly:
                </span>{" "}
                <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                  {formatNumber(result.yearlyPayment)} (
                  {formatNumber(result.timeInYears)} years)
                </span>
              </p>
            )}
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

export default LoanInterestCalculator;
