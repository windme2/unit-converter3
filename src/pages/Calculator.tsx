import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBackspace } from "react-icons/fa";
import toast from "react-hot-toast";
import Header from "../components/Header";

const Calculator = ({ isDark, toggleDarkMode }) => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleNumber = (num) => {
    if (display === "0" && num !== ".") {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperator = (op) => {
    const lastChar = expression.slice(-1);
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
      const newExpression = expression.slice(0, -1) + op;
      setExpression(newExpression);
      setDisplay(newExpression);
    } else {
      setExpression(expression + op);
      setDisplay(expression + op);
    }
  };

  const handlePercentage = () => {
    if (!expression || expression === "0") {
      toast.error("Please enter a number first", { duration: 3000 });
      return;
    }

    try {
      const parts = expression.match(/(\d*\.?\d+|\+|\-|\*|\/)/g) || [];
      if (parts.length === 0) {
        toast.error("Invalid expression", { duration: 3000 });
        return;
      }

      const lastPart = parts[parts.length - 1];
      if (["+", "-", "*", "/"].includes(lastPart)) {
        toast.error("Please enter a number before percentage", {
          duration: 3000,
        });
        return;
      }

      const number = parseFloat(lastPart);
      const percentage = number / 100;
      const newExpression = expression.slice(0, -lastPart.length) + percentage;
      setExpression(newExpression);
      setDisplay(newExpression);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      toast.error("Invalid percentage calculation", { duration: 3000 });
    }
  };

  const handleCalculate = () => {
    if (!expression || expression === "0") {
      toast.error("Please enter an expression", { duration: 3000 });
      return;
    }

    try {
      const lastChar = expression.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        throw new Error("Expression is incomplete");
      }

      const result = eval(expression);
      if (!isFinite(result)) throw new Error("Cannot divide by zero");
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      toast.error(error.message || "Calculation error", { duration: 3000 });
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay("0");
      setExpression("");
    }
  };

  const buttons = [
    { label: "C", action: handleClear, type: "clear" },
    { label: "%", action: handlePercentage, type: "operator" },
    { label: <FaBackspace />, action: handleBackspace, type: "operator" },
    { label: "÷", action: () => handleOperator("/"), type: "operator" },
    { label: "7", action: () => handleNumber("7"), type: "number" },
    { label: "8", action: () => handleNumber("8"), type: "number" },
    { label: "9", action: () => handleNumber("9"), type: "number" },
    { label: "×", action: () => handleOperator("*"), type: "operator" },
    { label: "4", action: () => handleNumber("4"), type: "number" },
    { label: "5", action: () => handleNumber("5"), type: "number" },
    { label: "6", action: () => handleNumber("6"), type: "number" },
    { label: "-", action: () => handleOperator("-"), type: "operator" },
    { label: "1", action: () => handleNumber("1"), type: "number" },
    { label: "2", action: () => handleNumber("2"), type: "number" },
    { label: "3", action: () => handleNumber("3"), type: "number" },
    { label: "+", action: () => handleOperator("+"), type: "operator" },
    { label: "00", action: () => handleNumber("00"), type: "number" },
    { label: "0", action: () => handleNumber("0"), type: "number" },
    { label: ".", action: () => handleNumber("."), type: "number" },
    { label: "=", action: handleCalculate, type: "equals" },
  ];

  useEffect(() => {
    const keyMap = {
      0: 17,
      1: 12,
      2: 13,
      3: 14,
      4: 8,
      5: 9,
      6: 10,
      7: 4,
      8: 5,
      9: 6,
      ".": 18,
      "+": 15,
      "-": 11,
      "*": 7,
      "/": 3,
      "%": 1,
      Enter: 19,
      NumpadEnter: 19,
      Backspace: 2,
      c: 0,
      C: 0,
      Numpad0: 17,
      Numpad1: 12,
      Numpad2: 13,
      Numpad3: 14,
      Numpad4: 8,
      Numpad5: 9,
      Numpad6: 10,
      Numpad7: 4,
      Numpad8: 5,
      Numpad9: 6,
      NumpadDecimal: 18,
      NumpadAdd: 15,
      NumpadSubtract: 11,
      NumpadMultiply: 7,
      NumpadDivide: 3,
    };

    const handleKeyDown = (event) => {
      const key = event.code || event.key;
      const buttonIndex = keyMap[key];
      if (buttonIndex !== undefined) {
        event.preventDefault();
        buttons[buttonIndex].action();
        setHoveredButton(buttonIndex);
        setTimeout(() => setHoveredButton(null), 200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression, display]);

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
          title="Calculator"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-2"
        />
        <input
          type="text"
          value={display}
          readOnly
          className={`calculator-display w-full h-12 text-3xl font-medium text-right pr-3 rounded-lg ${
            isDark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
          } border-none focus:outline-none`}
          aria-label="Calculator display"
        />
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.action}
              className={`calculator-button p-4 rounded-lg text-lg font-medium transition-all duration-200 flex items-center justify-center ${
                button.type === "clear"
                  ? isDark
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-red-400 hover:bg-red-300 text-white"
                  : button.type === "operator"
                  ? isDark
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : "bg-blue-300 hover:bg-blue-200 text-white"
                  : button.type === "equals"
                  ? isDark
                    ? "bg-green-500 hover:bg-green-400 text-white"
                    : "bg-green-300 hover:bg-green-200 text-white"
                  : isDark
                  ? "bg-gray-600 hover:bg-gray-500 text-gray-100"
                  : "bg-gray-200 hover:bg-gray-100 text-gray-900"
              } ${hoveredButton === index ? "scale-105" : ""}`}
              aria-label={button.label.toString()}
            >
              {button.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Calculator;
