import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUndo } from "react-icons/fa";
import Header from "../components/Header";

const TaxCalculator = ({ isDark, toggleDarkMode }) => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [allowances, setAllowances] = useState("");
  const [result, setResult] = useState({ taxableIncome: "0", taxPayable: "0" });

  const calculateTax = () => {
    if (!income || income <= 0) {
      setResult({ taxableIncome: "0", taxPayable: "0" });
      return;
    }

    const personalAllowance = 60000;
    const totalDeductions =
      (deductions ? parseFloat(deductions) : 0) +
      personalAllowance +
      (allowances ? parseFloat(allowances) : 0);
    const taxableIncome = parseFloat(income) - totalDeductions;

    if (taxableIncome <= 0) {
      setResult({ taxableIncome: "0", taxPayable: "0" });
      return;
    }

    let taxPayable = 0;
    if (taxableIncome <= 150000) {
      taxPayable = 0;
    } else if (taxableIncome <= 300000) {
      taxPayable = (taxableIncome - 150000) * 0.05;
    } else if (taxableIncome <= 500000) {
      taxPayable = 150000 * 0.05 + (taxableIncome - 300000) * 0.1;
    } else if (taxableIncome <= 750000) {
      taxPayable =
        150000 * 0.05 + 200000 * 0.1 + (taxableIncome - 500000) * 0.15;
    } else if (taxableIncome <= 1000000) {
      taxPayable =
        150000 * 0.05 +
        200000 * 0.1 +
        250000 * 0.15 +
        (taxableIncome - 750000) * 0.2;
    } else if (taxableIncome <= 2000000) {
      taxPayable =
        150000 * 0.05 +
        200000 * 0.1 +
        250000 * 0.15 +
        250000 * 0.2 +
        (taxableIncome - 1000000) * 0.25;
    } else if (taxableIncome <= 5000000) {
      taxPayable =
        150000 * 0.05 +
        200000 * 0.1 +
        250000 * 0.15 +
        250000 * 0.2 +
        1000000 * 0.25 +
        (taxableIncome - 2000000) * 0.3;
    } else {
      taxPayable =
        150000 * 0.05 +
        200000 * 0.1 +
        250000 * 0.15 +
        250000 * 0.2 +
        1000000 * 0.25 +
        3000000 * 0.3 +
        (taxableIncome - 5000000) * 0.35;
    }

    setResult({
      taxableIncome: taxableIncome.toFixed(2),
      taxPayable: taxPayable.toFixed(2),
    });
  };

  useEffect(() => {
    calculateTax();
  }, [income, deductions, allowances]);

  const resetForm = () => {
    setIncome("");
    setDeductions("");
    setAllowances("");
    setResult({ taxableIncome: "0", taxPayable: "0" });
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
          title="Tax Calculator"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-2"
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-semibold ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Annual Income (THB)"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-semibold ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Deductions (THB)"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={allowances}
                onChange={(e) => setAllowances(e.target.value)}
                className={`p-3 rounded-lg w-full text-base font-semibold ${
                  isDark
                    ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                    : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
                } border focus:ring-2 focus:ring-primary`}
                placeholder="Allowances (THB)"
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
            Tax Calculation Result
          </h3>
          <div className="flex flex-col gap-2 text-base">
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Taxable Income:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {result.taxableIncome} THB
              </span>
            </p>
            <p>
              <span className={isDark ? "text-white" : "text-black"}>
                Tax Payable:
              </span>{" "}
              <span className={isDark ? "text-teal-200" : "text-teal-700"}>
                {result.taxPayable} THB
              </span>
            </p>
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

export default TaxCalculator;
