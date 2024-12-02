import { AlertCircle, RefreshCw } from 'lucide-react'
import useUser from '../../store/useUser'



export default function ErrorTransaction({}) {
  const { theme } = useUser();

  return (
    <div className={` rounded-lg my-7 p-6 text-center  shadow-sm ${theme === "dark"  ? "bg-gray-800" : "bg-white"} `}>
      <div className="flex justify-center mb-4 ">
        <AlertCircle className={` w-12 h-12   ${theme === "dark"  ? "text-red-400" : "text-red-500"} `} />
      </div>
      <h3 className={`text-lg font-medium  mb-2  ${theme === "dark"  ? "text-white" : "text-gray-900"}`}>
        Error al cargar las transacciones
      </h3>

      <p className={`text-sm mb-6  ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        Ha ocurrido un error al busacar las transacciones
      </p>
      <button
        // onClick={onRetry}
        className={`inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2  focus:ring-offset-2 ${theme === "dark" ? "focus:ring-offset-gray-800 " : "focus:ring-blue-500"} `}
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Reintentar
      </button>
    </div>
  )
}