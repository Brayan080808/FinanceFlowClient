import { useEffect, useState } from 'react'
import { X, Plus, AlertCircle, XCircle } from 'lucide-react'
import useMutationConfig from '../../hooks/useMutationConfig'
import Spiner from '../Spiner'
import { useNavigate } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import useCoin from '../../hooks/useCoin'
import Warning from './warning'



const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
]

const expenseDefaultTags = [
  'Comida', 'Transporte', 'Entretenimiento', 'Salud', 'Educación',
  'Ropa', 'Hogar', 'Viajes', 'Regalos', 'Otros'
]

const incomeDefaultTags = [
  'Salario', 'Freelance', 'Inversiones', 'Alquileres', 'Ventas',
  'Bonos', 'Reembolsos', 'Regalos', 'Premios', 'Otros'
]


type TagCategory = 'expense' | 'income';


export default function AccountConfig() {

  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const [expenseTags, setExpenseTags] = useState<string[]>([]);
  const [incomeTags, setIncomeTags] = useState<string[]>([]);
  const [showErrorNotification,setShowErrorNotification] = useState<boolean>(false);
  const [newTag, setNewTag] = useState('');
  const [activeCategory, setActiveCategory] = useState<TagCategory>('expense');
  const [error, setError] = useState('');
  const [showWarning, setShowWarning] = useState(false)
  const { mutate, isPending, reset, isSuccess, isError:configError } = useMutationConfig();
  const navigate = useNavigate();
  const { isLoading, spendingCategory, isError, isSuccess:isSuccessCategories } = useCategories();
  const coin = useCoin();


  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value)
  }

  const handleTagClick = (tag: string, category: TagCategory) => {
    const setTags = category === 'expense' ? setExpenseTags : setIncomeTags
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleAddTag = () => {
    if (newTag && !getActiveTags().includes(newTag)) {
      const setTags = activeCategory === 'expense' ? setExpenseTags : setIncomeTags
      setTags(prev => [...prev, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string, category: TagCategory) => {
    const setTags = category === 'expense' ? setExpenseTags : setIncomeTags
    setTags(prev => prev.filter(t => t !== tag))
  }

  let initialExpenseTags:String[];
  let initialIncomeTags:String[];
  let expenseTagsFinal:String[];
  let incomeTagsFinal:String[];
  let tags:String[];


  
  useEffect(()=>{

    initialExpenseTags = spendingCategory?
    .filter(item => !item.income ) // Filtra los objetos donde income es true
    .map(item => item.category);

    initialIncomeTags = spendingCategory?
    .filter(item => item.income) // Filtra los objetos donde income es true
    .map(item => item.category);

    setExpenseTags(initialExpenseTags);
    setIncomeTags(initialIncomeTags);
  },[isSuccessCategories])

  useEffect(()=>{

      if(coin.isSuccess){
        setSelectedCurrency(currencies.find(item => item.name === coin.coin.coin)?.code)
      }


  },[coin.isSuccess])



  if(isLoading || coin.isLoading) return <div className=' w-screen h-screen flex justify-center items-center'><Spiner /></div>



  console.log("isError",isError)

  initialExpenseTags = spendingCategory?
  .filter(item => !item.income ) // Filtra los objetos donde income es true
  .map(item => item.category);
  
  initialIncomeTags = spendingCategory?
  .filter(item => item.income) // Filtra los objetos donde income es true
  .map(item => item.category);



  
  expenseTagsFinal = initialExpenseTags.concat(expenseDefaultTags);
  expenseTagsFinal = [...new Set(expenseTagsFinal)];
  expenseTagsFinal = expenseTagsFinal.slice(0, 10);


  incomeTagsFinal = initialIncomeTags.concat(incomeDefaultTags);
  incomeTagsFinal = [...new Set(incomeTagsFinal)];
  incomeTagsFinal = incomeTagsFinal.slice(0, 10);


  const getActiveTags = () => activeCategory === 'expense' ? expenseTags : incomeTags
  const getInitialTags = () => activeCategory === 'expense' ? expenseTagsFinal : incomeTagsFinal


  
  tags = initialExpenseTags.filter(item => !expenseTags?.includes(item));
     
  tags = tags.concat(initialIncomeTags.filter(item => !incomeTags?.includes(item)));



  const handleSaveConfig = async () => {
    if (expenseTags.length === 0 || incomeTags.length === 0) {
      setError('Debes seleccionar al menos una etiqueta de gasto y una de ingreso.')
    } else if (!selectedCurrency) {
      setError('Debes seleccionar una moneda.')
    } else {
      setError('')


      if(tags.length>0){
        setShowWarning(true);
      }
      else{
          await mutate({ selectedCurrency, expenseTags, incomeTags })


      }
    }
  }


  if(isSuccess){
    navigate('/dashboard/')
    window.location.reload();
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50  relative ">

        {isPending && (
          <div className=' absolute w-full h-full flex justify-center items-center bg-white bg-opacity-30 pointer-events-none '>
              <Spiner />
          </div>
        )}

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-center text-indigo-900 mb-6">Configura tu cuenta</h1>
          
          <div className="mb-6">
            
            <label htmlFor="currency" className="block text-sm font-medium text-indigo-700 mb-2">
              Selecciona tu moneda
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Selecciona una moneda</option>
              {currencies.map((currency,key) => (
                <option key={key} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex mb-4">
              <button
                onClick={() => setActiveCategory('expense')}
                className={`flex-1 py-2 text-sm font-medium rounded-l-md ${
                  activeCategory === 'expense'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Gastos
              </button>
              <button
                onClick={() => setActiveCategory('income')}
                className={`flex-1 py-2 text-sm font-medium rounded-r-md ${
                  activeCategory === 'income'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Ingresos
              </button>
            </div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Selecciona etiquetas para tus {activeCategory === 'expense' ? 'gastos' : 'ingresos'}
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {getInitialTags()?.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag, activeCategory)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getActiveTags()?.includes(tag)
                      ? activeCategory === 'expense'
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
                
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="newTag" className="block text-sm font-medium text-indigo-700 mb-2">
              Añade tus propias etiquetas de {activeCategory === 'expense' ? 'gastos' : 'ingresos'}
            </label>
            <div className="flex">
              <input
                type="text"
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-grow px-3 py-2 border border-indigo-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nueva etiqueta"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Etiquetas de {activeCategory === 'expense' ? 'gastos' : 'ingresos'} seleccionadas
            </label>
            <div className="flex flex-wrap gap-2">
              {getActiveTags()?.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white flex items-center ${
                    activeCategory === 'expense' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag, activeCategory)}
                    className="ml-2 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>



          {configError && (
          <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 z-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
              <XCircle size={24} className="mr-3" />
              <span className="font-medium">Error al guardar la configuración. Por favor, inténtalo de nuevo.</span>
              <button
                onClick={reset}
                className="ml-4 text-white hover:text-red-200 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}


          {showWarning && (
            <Warning removedTags={tags} setShowWarning={setShowWarning} saveConfiguration={mutate} selectedCurrency={selectedCurrency}  expenseTags={expenseTags} incomeTags={incomeTags} /> 
            
          )}
          
          <button
            onClick={handleSaveConfig}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar configuración
          </button>
        </div>
      </div>
    </div>
  )
}