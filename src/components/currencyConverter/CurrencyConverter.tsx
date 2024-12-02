import { useState,useEffect } from 'react'
import {  ArrowUpDown, Info, DollarSign, CreditCard, Wallet, TrendingUp } from 'lucide-react'
import useUser from '../../store/useUser'

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'MXN']

const exchangeRates = {
  USD: {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110.0,
      CAD: 1.25,
      AUD: 1.35,
      CHF: 0.92,
      CNY: 6.45,
      MXN: 20.0,
  },
  EUR: {
      USD: 1.18,
      EUR: 1,
      GBP: 0.88,
      JPY: 129.0,
      CAD: 1.47,
      AUD: 1.59,
      CHF: 1.08,
      CNY: 7.58,
      MXN: 23.5,
  },
  GBP: {
      USD: 1.33,
      EUR: 1.14,
      GBP: 1,
      JPY: 146.0,
      CAD: 1.67,
      AUD: 1.80,
      CHF: 1.23,
      CNY: 8.61,
      MXN: 28.0,
  },
  JPY: {
      USD: 0.0091,
      EUR: 0.0078,
      GBP: 0.0068,
      JPY: 1,
      CAD: 0.011,
      AUD: 0.0092,
      CHF: 0.0063,
      CNY: 0.053,
      MXN: 0.14,
  },
  CAD: {
      USD: 0.80,
      EUR: 0.68,
      GBP: 0.60,
      JPY: 90.0,
      CAD: 1,
      AUD: 1.11,
      CHF: 0.74,
      CNY: 5.20,
      MXN: 16.0,
  },
  AUD: {
      USD: 0.74,
      EUR: 0.63,
      GBP: 0.56,
      JPY: 82.0,
      CAD: 0.90,
      AUD: 1,
      CHF: 0.66,
      CNY: 4.75,
      MXN: 14.5,
  },
  CHF: {
      USD: 1.09,
      EUR: 0.93,
      GBP: 0.81,
      JPY: 158.0,
      CAD: 1.35,
      AUD: 1.52,
      CHF: 1,
      CNY: 7.15,
      MXN: 22.0,
  },
  CNY: {
      USD: 0.15,
      EUR: 0.13,
      GBP: 0.12,
      JPY: 18.8,
      CAD: 0.19,
      AUD: 0.21,
      CHF: 0.14,
      CNY: 1,
      MXN: 3.06,
  },
  MXN: {
      USD: 0.050,
      EUR: 0.042,
      GBP: 0.036,
      JPY: 7.1,
      CAD: 0.0625,
      AUD: 0.069,
      CHF: 0.045,
      CNY: 0.33,
      MXN: 1,
  },
};


export default function Component() {
  const [amount, setAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [exchangeRate, setExchangeRate] = useState(1.2)
  const { theme } = useUser();

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  useEffect(()=>{
    setExchangeRate(exchangeRates[fromCurrency][toCurrency])

  },[fromCurrency,toCurrency])



  return (
    <div className={`min-h-screen `}>

      {/* Main Content */}
      <main className={`max-w-6xl mx-auto px-4 py-12`}>
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white" } rounded-xl shadow-2xl overflow-hidden`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8 border-b pb-6 px-10">
              <h2 className={`text-3xl font-bold  ${theme  === "dark" ? "text-white": "text-gray-900"}`}>
                Currency Converter
              </h2>
              <TrendingUp className="h-10 w-10 text-[#40CFA4] mr-3" />

            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#40CFA4]/10 p-6 rounded-xl flex flex-col items-center justify-center">
                <DollarSign className="h-10 w-10 text-[#40CFA4] mb-2" />
                <span className={`text-sm font-medium  ${theme  === "dark" ? "text-gray-300" : "text-gray-700"} `}>Quick Conversion</span>
              </div>
              <div className="bg-[#FFD080]/10 p-6 rounded-xl flex flex-col items-center justify-center">
                <CreditCard className="h-10 w-10 text-[#FFD080] mb-2" />
                <span className={`text-sm ${theme  === "dark" ? "text-gray-300" : "text-gray-700"
                } font-medium `}>Multiple Currencies</span>
              </div>
              <div className="bg-[#FF6B8B]/10 p-6 rounded-xl flex flex-col items-center justify-center">
                <Wallet className="h-10 w-10 text-[#FF6B8B] mb-2" />
                <span className={`text-sm font-medium ${theme  === "dark" ? "text-gray-300" : "text-gray-700"} `}>Updated Rates</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className={`block text-sm font-medium  mb-2 ${theme  === "dark" ? "text-gray-300" : " text-gray-700" } `}>
                  Amount to Convert
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`block w-full rounded-xl border   pl-7 pr-20 focus:ring-2 focus:ring-[#40CFA4] focus:border-transparent  text-lg py-4 px-6 shadow-sm ${theme === "dark" ? "bg-gray-700  text-white border-gray-600" : "border-gray-300 "}  `}
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="fromCurrency" className="sr-only">Currency</label>
                    <select
                      id="fromCurrency"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className={`h-full rounded-r-xl border-transparent bg-transparent py-0 pl-2 pr-7   focus:ring-2 focus:ring-[#40CFA4] text-lg font-medium ${theme ? "text-gray-300":"text-gray-500"}`}
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="p-4 rounded-full bg-[#40CFA4] hover:bg-[#40CFA4]/90 text-white shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ArrowUpDown className="h-6 w-6" />
                </button>
              </div>

              <div>
                <label className={`${theme  === "dark" ? "text-gray-300" : "text-gray-700"} block text-sm font-medium mb-2`}>
                  Convert to
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={(parseFloat(amount) * exchangeRate).toFixed(2)}
                    readOnly
                    className={`block w-full rounded-xl border pl-7 pr-20   text-lg py-4 px-6 shadow-sm ${theme  === "dark" ? " border-gray-600 bg-gray-700 text-white " : "border-gray-300 bg-gray-50 " } `}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="toCurrency" className="sr-only">Currency</label>
                    <select
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className={`h-full rounded-r-xl border-transparent bg-transparent py-0 pl-2 pr-7  focus:ring-2 focus:ring-[#40CFA4] text-lg font-medium ${theme  === "dark" ? "text-gray-300": "text-gray-500"}`}
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${theme  === "dark" ? " bg-gray-700/50 " : "bg-gray-50"}  p-6`}>
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"} `}>
                <Info className="h-5 w-5 mr-2" />
                <span className="font-medium">Exchange rate:</span>
              </div>
              <div className={`  font-bold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"} `}>
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </div>
            </div>
            <div className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-xs `}>
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}