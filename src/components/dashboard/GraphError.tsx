import { AlertTriangle, RefreshCw } from 'lucide-react'

import { QueryObserverResult } from '@tanstack/react-query';
import useUser from '../../store/useUser';

interface GraphErrorProps {
  refetch: () => Promise<QueryObserverResult<any, unknown>>;
}

export default function GraphError({refetch}:GraphErrorProps) {
  const { theme } = useUser();

  return (
    <div className={`${theme==="dark" ? ":bg-gray-800" : "bg-white"} rounded-lg shadow-sm p-6 flex flex-col items-center justify-center h-64 mb-6`}>
      <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
      <h3 className={` ${theme==="dark" ? "text-white" : "text-gray-900"} text-lg font-medium  mb-2`}>
        Error al cargar el gráfico
      </h3>
      <p className={`text-sm  ${theme === "dark" ? "text-gray-300  " : "text-gray-600"} text-center mb-4`}>
        No se pudieron cargar los datos del gráfico. Esto puede deberse a problemas de conexión o a un error temporal.
      </p>
      <button
        onClick={refetch}
        className={` inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Recargar gráfico
      </button>
    </div>
  )
}