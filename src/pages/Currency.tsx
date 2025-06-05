import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaExchangeAlt, FaTrash, FaPlus, FaUndo, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import useLocalStorage from "../hooks/useLocalStorage";
import { currencyNames } from "../utils/constants";
import { formatNumber, getCurrentTimestamp } from "../utils/helpers";
import Header from "../components/Header";

interface CurrencyConverterProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

interface ConversionHistoryItem {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  result: number;
  timestamp: string;
}

interface CurrencyPair {
  from: string;
  to: string;
  pinned?: boolean;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  isDark,
  toggleDarkMode,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useLocalStorage<string>("fromCurrency", "USD");
  const [toCurrency, setToCurrency] = useLocalStorage<string>("toCurrency", "THB");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorage<CurrencyPair[]>("favoritePairs", []);  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currencies = Object.keys(currencyNames);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    amountInputRef.current?.focus();
    // Fetch initial rate
    if (fromCurrency && toCurrency) {
      fetchExchangeRate(fromCurrency, toCurrency);
    }
  }, []);  const calculateResult = (currentRate: number, currentAmount: string) => {
    if (currentAmount && parseFloat(currentAmount) > 0) {
      const converted = parseFloat(currentAmount) * currentRate;
      setResult(converted);
    } else {
      setResult(null);
    }
  };

  const fetchExchangeRate = async (from: string, to: string): Promise<void> => {
    if (!from || !to) {
      setResult(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const currentRate = response.data.rates[to];
      if (!currentRate) {
        throw new Error("Rate not found");
      }
      setRate(currentRate);
      calculateResult(currentRate, amount);
      setTimestamp(getCurrentTimestamp());
      setError(null);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setError("Failed to fetch exchange rate");
      toast.error("Failed to fetch exchange rate");
      setRate(null);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((from: string, to: string) => fetchExchangeRate(from, to), 500),
    []
  );
  useEffect(() => {
    if (rate) {
      calculateResult(rate, amount);
    }
  }, [amount, rate]);

  useEffect(() => {
    debouncedFetch(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, debouncedFetch]);

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const resetForm = (): void => {
    setAmount("");
    setResult(null);
    setRate(null);
    setTimestamp(null);
    setError(null);
  };

  const addFavorite = (pair: CurrencyPair): void => {
    if (!favorites.some(fav => fav.from === pair.from && fav.to === pair.to)) {
      setFavorites([...favorites, { ...pair, pinned: false }]);
      toast.success(`Added ${pair.from} > ${pair.to} to favorites!`);
    }
  };

  const pinFavorite = (pair: CurrencyPair): void => {
    setFavorites(
      favorites.map(fav =>
        fav.from === pair.from && fav.to === pair.to
          ? { ...fav, pinned: !fav.pinned }
          : fav
      )
    );
    toast.success(
      `${pair.from} > ${pair.to} ${pair.pinned ? "unpinned" : "pinned"}!`,
      { duration: 1500 }
    );
  };

  const clearFavorites = (): void => {
    setFavorites([]);
    toast.success("Favorites cleared!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto p-10"
    >
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-red-500 text-sm text-center"
        >
          {error}
        </motion.p>
      )}      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className={`card-container p-6 rounded-lg flex flex-col gap-4 relative ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg z-10">
            <div className="spinner"></div>
          </div>
        )}
        <Header
          title="Currency Converter"
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
          className="mt-2"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Favorites
            </span>
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className={`p-2 rounded-lg text-white text-sm flex items-center gap-1 transition ${
                  isDark
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-red-500 hover:bg-red-400"
                }`}
                aria-label="Clear favorites"
              >
                <FaTrash size={14} />
                Clear
              </button>
            )}
          </div>
          {favorites.length === 0 ? (
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No favorites added
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {favorites.slice(0, 4).map((fav, index) => (
                <motion.button
                  key={`${fav.from}-${fav.to}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className={`p-1.5 rounded-lg text-[0.65rem] font-medium flex items-center justify-center gap-1 border ${
                    isDark
                      ? "bg-gray-800 text-gray-100 border-gray-600 hover:bg-gray-700"
                      : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                  } transition-colors duration-200`}
                  onClick={() => pinFavorite(fav)}
                  aria-label={`${fav.from} to ${fav.to}`}
                >
                  <FaStar
                    className={`${
                      fav.pinned ? "text-yellow-500" : "text-gray-400"
                    } mr-1`}
                    size={10}
                  />
                  <span>
                    {fav.from} → {fav.to}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
          <button
            onClick={() => addFavorite({ from: fromCurrency, to: toCurrency })}
            className={`p-2 rounded-lg text-white text-sm flex items-center gap-1 transition ${
              isDark
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-teal-500 hover:bg-teal-600"
            } self-start`}
            aria-label="Add to favorites"
          >
            <FaStar size={14} />
            Add to Favorites
          </button>
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className={`p-3 rounded-lg w-full text-sm font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } border focus:ring-2 focus:ring-primary pr-10`}
              aria-label="From currency"
            >
              {[
                "USD",
                "THB",
                "EUR",
                "JPY",
                "GBP",
                "KRW",
                "AUD",
                "CAD",
                "CHF",
                "CNY",
                "INR",
                "SGD",
                "NZD",
                "HKD",
                "SEK",
                "NOK",
                "DKK",
                "RUB",
                "ZAR",
                "BRL",
                "MXN",
                "MYR",
                "PHP",
                "TWD",
                "IDR",
              ].map((currency) => (
                <option key={currency} value={currency}>
                  {currencyNames[currency]?.th || currency} ({currency})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={swapCurrencies}
            className={`p-2.5 rounded-full text-white transition focus:ring-2 focus:ring-primary ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            aria-label="Swap currencies"
          >
            <FaExchangeAlt size={16} />
          </button>
          <div className="flex-1">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={`p-3 rounded-lg w-full text-sm font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } border focus:ring-2 focus:ring-primary pr-10`}
              aria-label="To currency"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currencyNames[currency]?.th || currency} ({currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className={`p-3 rounded-lg w-full text-lg font-semibold ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
              } border focus:ring-2 focus:ring-primary`}
              placeholder="0.00"
              ref={amountInputRef}
              aria-label="Amount to convert"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={result ? formatNumber(result) : "0.00"}
              readOnly
              className={`p-3 rounded-lg w-full text-lg font-semibold text-right ${
                isDark
                  ? "bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 border-gray-300 placeholder-gray-500"
              } border cursor-not-allowed`}
              aria-label="Conversion result"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div>
            {rate && (
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                1 {fromCurrency} = {formatNumber(rate)} {toCurrency}
              </p>
            )}
            {timestamp && (
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Updated: {timestamp}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
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
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CurrencyConverter;
