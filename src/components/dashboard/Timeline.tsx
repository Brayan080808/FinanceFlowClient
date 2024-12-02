import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import useTimeline from '../../hooks/useTimeline';
import Calendar from '../Calendar';
import Spiner from '../Spiner';
import GraphError from './GraphError';
import useUser from '../../store/useUser';



export default function Timeline() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'all' | 'custom'>('month');
  const { theme } = useUser();

  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const { data:filteredData, isLoading, isError, isSuccess, refetch } = useTimeline({ timeRange,dateRange });



  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { date, value } = payload[0].payload; // Obtén los datos del payload
        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px' }}>
                <p style={{ color: 'black', margin: 0 }}>{`Date: ${date}`}</p>
                <p style={{ color: '#45B7D1', margin: 0 }}>{`Amount: ${value}`}</p>
            </div>
        );
    }
    return null;
};

  const renderTimeline = () => {


  return (
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}  p-6 rounded-lg shadow-lg `}>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Transaction Timeline</h3>
          <div className="mb-6">
            <div className="flex flex-wrap justify-start gap-3 mb-4">
              {['week', 'month', 'year', 'all'].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    timeRange === range 
                      ? 'bg-teal-500 text-white' 
                      : ` ${ theme === "dark" && " text-white"}  text-gray-700 border border-gray-300 hover:bg-teal-50`
                  }`}
                  onClick={() => {
                    setTimeRange(range as 'week' | 'month' | 'year' | 'all')
                    setDateRange({ start: null, end: null })
                  }}
                >
                  {range === 'week' ? 'Last Week' : range === 'month' ? 'Last Month' : range === 'year' ? 'Last Year' : 'All'}
                </button>
              ))}
              <Calendar timeRange={timeRange} setTimeRange={setTimeRange} setDateRange={setDateRange} dateRange={dateRange} theme={theme}/>
    
            </div>

          </div>
            <div className=' h-64 flex justify-center items-center'>

            {isLoading && <Spiner />}
            {isError && <GraphError refetch={refetch} />} 
            {isSuccess && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                          <YAxis dataKey="value" />
                          <XAxis dataKey="date" tick={false} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="#45B7D1" strokeWidth={2} name="Transactions" dot={true} />
                        </LineChart>
                      </ResponsiveContainer>
            )}

            </div>
        </div>
      )
    }

  return renderTimeline()
}