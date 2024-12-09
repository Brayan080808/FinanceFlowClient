interface Data{
  selectedCurrency:string;
  expenseTags:string[];
  incomeTags:string[];
}


interface WarnigData{
  removedTags?:string[];
  selectedCurrency?:string;
  expenseTags?:string[];
  incomeTags?:string[];
  setShowWarning: (warning:boolean) => void;
  saveConfiguration:(data:Data) => void;

}



export default function Warning({removedTags,setShowWarning,saveConfiguration,selectedCurrency,expenseTags,incomeTags}:WarnigData){




    const handleSaveConfiguration = async () => {

      await saveConfiguration({selectedCurrency,expenseTags,incomeTags});
      setShowWarning(false)


    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4 text-red-600">Advertencia</h3>
            <p className="mb-4">Has eliminado las siguientes categorías:</p>
            <ul className="list-disc list-inside mb-4">
              {removedTags.map((tag:string,key:number) => (
                <li key={key}>{tag}</li>
              ))}
            </ul>
            <p className="mb-6">Si continúas, se eliminarán todas las transacciones asociadas a estas categorías. ¿Estás seguro de que deseas continuar?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveConfiguration}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )
}


