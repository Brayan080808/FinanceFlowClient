import { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'
import useUser from '../../store/useUser';

interface Data{
  category:string;
  amount:number;
  count:number;
  income:boolean;
}

interface Graph{
  categories: Data[];
  title: string;
}


export default function Graph({ categories,title }:Graph) {
  const colors = [
    '#FF6384', // Color original 1
    '#36A2EB', // Color original 2
    '#FFCE56', // Color original 3
    '#4BC0C0', // Color original 4
    '#9966FF', // Color original 5
    '#FF9F40', // Nuevo color 1
    '#FF5B5B', // Nuevo color 2
    '#4BC0C0', // Nuevo color 3
    '#FFB1C1', // Nuevo color 4
    '#A4D65E'  // Nuevo color 5
];

  const { theme } = useUser();

  const COLOR_MAP = categories.reduce((acc, item, index) => {
    acc[item.category] = colors[index];
    return acc;
  }, {});


  const [data, setData] = useState<Data[]>(categories)
  const [chartType, setChartType] = useState<'Bar' | 'Pie' | 'Line'>('Bar')
  const [representation, setRepresentation] = useState<'Amount' | 'Count'>('Amount')



  const toggleCategory = (category: string) => {
    setData(prevData => 
      prevData.map(item => 
        item.category === category 
          ? { ...item, hidden: !item.hidden } 
          : item
      )
    )
  }

  const convertedData = data.filter(item => !item.hidden)

  const  visibleData = convertedData.map(item => ({
    category: item.category,
    income: item.income,
    amount: parseFloat(item.amount), // Convierte a float
    count: parseInt(item.count, 10)   // Convierte a int
}));

  const renderChart = () => {
    const dataKey = representation === 'Amount' ? 'Amount' : 'Count';


    const renderTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
          const { category, amount, count } = payload[0].payload; // Ajusta según tu estructura de datos
          return (
              <div className="custom-tooltip bg-white border-1 border-solid border-[#ccc] p-[10px] ">
                {representation == 'Amount' ? <p>{`${category} : ${amount}`}</p>
                                :
                                  <p>{`${category} : ${count}`}</p>
                                }
                  
              </div>
          );
      }
      return null;
  };


    switch (chartType) {
      case 'Bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visibleData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey === "Amount" ? "amount" : "count"}>
                {visibleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )
      case 'Pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visibleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey == "Amount" ? "amount" : "count"} 
                label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
              >
                {visibleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.category]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'Line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visibleData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              {visibleData.map((entry, index) => (
                <Line 
                  key={`line-${index}`}
                  type="monotone" 
                  dataKey={dataKey === "Amount" ? "amount" : "count"} 
                  stroke={COLOR_MAP[entry.category]} 
                  name={entry.category}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  

  return (
    <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white gray-100 '}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Estadísticas de {title}</h2>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="space-x-2">
              {['Bar','Pie','Line'].map(
                (type,key) => (
                  
                    <button 
                      key={key}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        chartType === type 
                          ? 'bg-teal-500 text-white' 
                          : ` ${theme === 'dark' ? " text-white " :" text-gray-700 " }  border border-gray-300 hover:bg-teal-50 `
                      }`}
                      onClick={() => setChartType(type)}
                    >
                    {type}
                    </button>
                  
                )
              )}
            </div>

            <div className="space-x-2">

            {['Amount','Count'].map((type,key)=>
                  (
                  <button 
                    key={key}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      representation === type
                         ? 'bg-teal-500 text-white' 
                         : ` ${theme === 'dark' ? " text-white " :" text-gray-700 " }  border border-gray-300 hover:bg-teal-50 `
                    }`}
                    onClick={() => setRepresentation(type)}
                  >
                    {type}
                  </button>)
            )}

            </div>

          </div>
  
          <div className="flex justify-center text-black">
            {renderChart()}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {data.map(item => (
              <button
                key={item.category}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.hidden 
                    ? 'bg-transparent hover:bg-opacity-10' 
                    : 'text-white'
                }`}
                onClick={() => toggleCategory(item.category)}
                style={{
                  backgroundColor: item.hidden ? 'transparent' : COLOR_MAP[item.category],
                  color: item.hidden ? COLOR_MAP[item.category] : 'white',
                  borderColor: COLOR_MAP[item.category],
                  borderWidth: item.hidden ? '1px' : '0px',
                }}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
