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

const pageTransition = {
  initial: { 
    opacity: 0,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Stagger children animations
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>("darkMode", false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleDarkMode = (): void => {
    setIsDark(!isDark);
    toast.success(`Switched to ${isDark ? "Light" : "Dark"} Mode!`, {
      duration: 1500,
    });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-hidden">
      <Toaster position="top-right" />
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <Calculator isDark={isDark} toggleDarkMode={toggleDarkMode} />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/unitmenu"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <UnitMenu isDark={isDark} toggleDarkMode={toggleDarkMode} />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/currency"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <CurrencyConverter
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/weight"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <WeightConverter
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/length"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <LengthConverter
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/area"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <AreaConverter
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/volume"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <VolumeConverter
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/bmi"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <BMICalculator
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/loan"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <LoanInterestCalculator
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/percentage"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <PercentageCalculator
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/tax"
              element={
                <motion.div {...pageTransition}>
                  <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <TaxCalculator
                      isDark={isDark}
                      toggleDarkMode={toggleDarkMode}
                    />
                  </motion.div>
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
