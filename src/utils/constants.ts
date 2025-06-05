interface LanguageStrings {
  en: string;
  th: string;
}

interface CurrencyNames {
  [key: string]: LanguageStrings;
}

export const currencyNames: CurrencyNames = {
  USD: { en: "United States Dollar", th: "ดอลลาร์สหรัฐ" },
  THB: { en: "Thai Baht", th: "บาทไทย" },
  EUR: { en: "Euro", th: "ยูโร" },
  JPY: { en: "Japanese Yen", th: "เยนญี่ปุ่น" },
  GBP: { en: "British Pound", th: "ปอนด์อังกฤษ" },
  KRW: { en: "South Korean Won", th: "วอนเกาหลีใต้" },
  AUD: { en: "Australian Dollar", th: "ดอลลาร์ออสเตรเลีย" },
  CAD: { en: "Canadian Dollar", th: "ดอลลาร์แคนาดา" },
  CHF: { en: "Swiss Franc", th: "ฟรังก์สวิส" },
  CNY: { en: "Chinese Yuan", th: "หยวนจีน" },
  INR: { en: "Indian Rupee", th: "รูปีอินเดีย" },
  SGD: { en: "Singapore Dollar", th: "ดอลลาร์สิงคโปร์" },
  NZD: { en: "New Zealand Dollar", th: "ดอลลาร์นิวซีแลนด์" },
  HKD: { en: "Hong Kong Dollar", th: "ดอลลาร์ฮ่องกง" },
  SEK: { en: "Swedish Krona", th: "โครนาสวีเดน" },
  NOK: { en: "Norwegian Krone", th: "โครนนอร์เวย์" },
  DKK: { en: "Danish Krone", th: "โครนเดนมาร์ก" },
  RUB: { en: "Russian Ruble", th: "รูเบิลรัสเซีย" },
  ZAR: { en: "South African Rand", th: "แรนด์แอฟริกาใต้" },
  BRL: { en: "Brazilian Real", th: "เรียลบราซิล" },
  MXN: { en: "Mexican Peso", th: "เปโซเม็กซิโก" },
  MYR: { en: "Malaysian Ringgit", th: "ริงกิตมาเลเซีย" },
  PHP: { en: "Philippine Peso", th: "เปโซฟิลิปปินส์" },
  TWD: { en: "Taiwan Dollar", th: "ดอลลาร์ไต้หวัน" },
  IDR: { en: "Indonesian Rupiah", th: "รูเปียห์อินโดนีเซีย" },
};

export const unitLabels = {
  weight: {
    kg: { full: "Kilogram", short: "kg", th: "กิโลกรัม" },
    lb: { full: "Pound", short: "lb", th: "ปอนด์" },
    g: { full: "Gram", short: "g", th: "กรัม" },
    oz: { full: "Ounce", short: "oz", th: "ออนซ์" },
    t: { full: "Ton", short: "t", th: "ตัน" },
    mg: { full: "Milligram", short: "mg", th: "มิลลิกรัม" },
    st: { full: "Stone", short: "st", th: "สโตน" },
    ct: { full: "Carat", short: "ct", th: "กะรัต" },
    gr: { full: "Grain", short: "gr", th: "เกรน" },
  },
  length: {
    m: { full: "Meter", short: "m", th: "เมตร" },
    km: { full: "Kilometer", short: "km", th: "กิโลเมตร" },
    cm: { full: "Centimeter", short: "cm", th: "เซนติเมตร" },
    mm: { full: "Millimeter", short: "mm", th: "มิลลิเมตร" },
    ft: { full: "Foot", short: "ft", th: "ฟุต" },
    in: { full: "Inch", short: "in", th: "นิ้ว" },
  },
  volume: {
    l: { full: "Liter", short: "L", th: "ลิตร" },
    ml: { full: "Milliliter", short: "mL", th: "มิลลิลิตร" },
    gal: { full: "Gallon", short: "gal", th: "แกลลอน" },
    qt: { full: "Quart", short: "qt", th: "ควอร์ต" },
    pt: { full: "Pint", short: "pt", th: "ไพน์ต" },
    cup: { full: "Cup", short: "cup", th: "ถ้วย" },
  },
  area: {
    sqm: { full: "Square Meter", short: "m²", th: "ตารางเมตร" },
    sqkm: { full: "Square Kilometer", short: "km²", th: "ตารางกิโลเมตร" },
    sqft: { full: "Square Foot", short: "ft²", th: "ตารางฟุต" },
    sqin: { full: "Square Inch", short: "in²", th: "ตารางนิ้ว" },
    ha: { full: "Hectare", short: "ha", th: "เฮกตาร์" },
    acre: { full: "Acre", short: "acre", th: "เอเคอร์" },
  },
};

export const weightConversionRates = {
  kg: { kg: 1, lb: 2.20462, g: 1000, oz: 35.274, t: 0.001, mg: 1_000_000, st: 0.157473, ct: 5_000, gr: 15_432.36 },
  lb: { kg: 0.453592, lb: 1, g: 453.592, oz: 16, t: 0.000453592, mg: 453_592, st: 0.0714286, ct: 2_267.96, gr: 7_000 },
  g: { kg: 0.001, lb: 0.00220462, g: 1, oz: 0.035274, t: 0.000001, mg: 1000, st: 0.000157473, ct: 5, gr: 15.4324 },
  oz: { kg: 0.0283495, lb: 0.0625, g: 28.3495, oz: 1, t: 0.0000283495, mg: 28_349.5, st: 0.00446429, ct: 141.748, gr: 437.5 },
  t: { kg: 1000, lb: 2204.62, g: 1_000_000, oz: 35_274, t: 1, mg: 1_000_000_000, st: 157.473, ct: 5_000_000, gr: 15_432_360 },
  mg: { kg: 0.000001, lb: 0.00000220462, g: 0.001, oz: 0.000035274, t: 0.000000001, mg: 1, st: 0.000000157473, ct: 0.005, gr: 0.0154324 },
  st: { kg: 6.35029, lb: 14, g: 6_350.29, oz: 224, t: 0.00635029, mg: 6_350_290, st: 1, ct: 31_751.5, gr: 98_000 },
  ct: { kg: 0.0002, lb: 0.000440925, g: 0.2, oz: 0.00705479, t: 0.0000002, mg: 200, st: 0.000031746, ct: 1, gr: 3.08647 },
  gr: { kg: 0.0000647989, lb: 0.000142857, g: 0.0647989, oz: 0.00228571, t: 0.0000000647989, mg: 64.7989, st: 0.0000102041, ct: 0.323994, gr: 1 },
};

export const lengthConversionRates = {
  m: { m: 1, km: 0.001, cm: 100, mm: 1000, ft: 3.28084, in: 39.3701 },
  km: { m: 1000, km: 1, cm: 100000, mm: 1000000, ft: 3280.84, in: 39370.1 },
  cm: { m: 0.01, km: 0.00001, cm: 1, mm: 10, ft: 0.0328084, in: 0.393701 },
  mm: { m: 0.001, km: 0.000001, cm: 0.1, mm: 1, ft: 0.00328084, in: 0.0393701 },
  ft: { m: 0.3048, km: 0.0003048, cm: 30.48, mm: 304.8, ft: 1, in: 12 },
  in: { m: 0.0254, km: 0.0000254, cm: 2.54, mm: 25.4, ft: 0.0833333, in: 1 },
};

export const volumeConversionRates = {
  l: { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675 },
  ml: { l: 0.001, ml: 1, gal: 0.000264172, qt: 0.00105669, pt: 0.00211338, cup: 0.00422675 },
  gal: { l: 3.78541, ml: 3785.41, gal: 1, qt: 4, pt: 8, cup: 16 },
  qt: { l: 0.946353, ml: 946.353, gal: 0.25, qt: 1, pt: 2, cup: 4 },
  pt: { l: 0.473176, ml: 473.176, gal: 0.125, qt: 0.5, pt: 1, cup: 2 },
  cup: { l: 0.236588, ml: 236.588, gal: 0.0625, qt: 0.25, pt: 0.5, cup: 1 },
};

export const areaConversionRates = {
  sqm: { sqm: 1, sqkm: 0.000001, sqft: 10.7639, sqin: 1550, ha: 0.0001, acre: 0.000247105 },
  sqkm: { sqm: 1000000, sqkm: 1, sqft: 10763900, sqin: 1550000000, ha: 100, acre: 247.105 },
  sqft: { sqm: 0.092903, sqkm: 0.000000092903, sqft: 1, sqin: 144, ha: 0.0000092903, acre: 0.0000229568 },
  sqin: { sqm: 0.00064516, sqkm: 0.00000000064516, sqft: 0.00694444, sqin: 1, ha: 0.000000064516, acre: 0.000000159425 },
  ha: { sqm: 10000, sqkm: 0.01, sqft: 107639, sqin: 15500000, ha: 1, acre: 2.47105 },
  acre: { sqm: 4046.86, sqkm: 0.00404686, sqft: 43560, sqin: 6272640, ha: 0.404686, acre: 1 },
};