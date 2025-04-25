import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage from "./hooks/useLocalStorage";
import Calculator from "./pages/Calculator";
import CurrencyConverter from "./pages/Currency";
import WeightConverter from "./pages/Weight";
import LengthConverter from "./pages/Length";
import AreaConverter from "./pages/Area";
import VolumeConverter from "./pages/Volume";
import BMICalculator from "./pages/BMI";
import LoanInterestCalculator from "./pages/LoanInterest";
import PercentageCalculator from "./pages/Percentage";
import UnitMenu from "./pages/UnitMenu";
import TaxCalculator from "./pages/Tax";

const App = () => {
  const [isDark, setIsDark] = useLocalStorage("darkMode", false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    toast.success(`Switched to ${isDark ? "Light" : "Dark"} Mode!`, {
      duration: 1500,
    });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-hidden">
      <Toaster position="top-right" />
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Calculator isDark={isDark} toggleDarkMode={toggleDarkMode} />
                </motion.div>
              }
            />
            <Route
              path="/unitmenu"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <UnitMenu isDark={isDark} toggleDarkMode={toggleDarkMode} />
                </motion.div>
              }
            />
            <Route
              path="/currency"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <CurrencyConverter
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/weight"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <WeightConverter
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/length"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <LengthConverter
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/area"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <AreaConverter
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/volume"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <VolumeConverter
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/bmi"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <BMICalculator
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/loan"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <LoanInterestCalculator
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/percentage"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <PercentageCalculator
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
            <Route
              path="/tax"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <TaxCalculator
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                  />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
        <footer
          className={`w-full text-center py-2 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          © 2025 Intouch Charoenphon. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default App;
