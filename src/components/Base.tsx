import { Moon, Sun } from 'lucide-react'
import Profile from './authentication/Profile'
import DashboardAside from './dashboard/DashboardAside'
import { Github, Twitter } from "lucide-react"

import { Outlet, Link } from 'react-router-dom'
import useUser from '../store/useUser'


// Definición de tipos para las transacciones y el nuevo objeto de transacción
export default function Stadicts() {
  // const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { theme, setTheme } = useUser();
  const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };



  return (
    <div className={`w-screen overflow-hidden relative  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-purple-50'}`}>

      
      <header className={`w-screen flex sticky shadow-xl z-20 top-0 left-0 right-0 justify-between items-center p-4 md:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} h-20`}>
        <div className="flex items-center space-x-4 ">

          <div className='w-5 h-14 flex justify-center items-center'>
            <DashboardAside  />
          </div>
        

          <h1 className="flex items-center">
                <span className="text-[#40CFA4] text-2xl font-bold">Finance</span>
                <span className={`${theme === "dark" ? "text-white" : "text-gray-700 "}  text-2xl font-bold`}>Flow</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full  dark:hover:bg-gray-700" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>

          <Profile />
          
        </div>
      </header>
        <main>
            <Outlet />
        </main>
        <footer className={`w-full py-6 px-4 mt-auto border-t ${
      theme === "dark" 
        ? "bg-slate-900 border-slate-800 text-slate-400" 
        : "bg-white border-slate-200 text-slate-600"
    }`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className={`font-semibold text-xl ${
              theme === "dark" ? "text-slate-200" : "text-slate-900"
            }`}>
               <span className="text-[#40CFA4] ">Finance</span>
               <span className={`${theme === "dark" ? "text-white" : "text-gray-700"}`} >Flow</span>
            </h3>

            <h1 className="flex items-center">
               
          </h1>
            <p className="text-sm">
              Gestiona tus finanzas personales de manera simple y efectiva
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className={`font-semibold ${
              theme === "dark" ? "text-slate-200" : "text-slate-900"
            }`}>
              Enlaces Rápidos
            </h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/transactions" className="hover:underline">Transacciones</Link>
              <Link to="/reports" className="hover:underline">Reportes</Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h4 className={`font-semibold ${
              theme === "dark" ? "text-slate-200" : "text-slate-900"
            }`}>
              Síguenos
            </h4>
            <div className="flex space-x-4">
              <Link 
                to="https://github.com" 
                className={`hover:${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                to="https://twitter.com" 
                className={`hover:${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <p className="text-sm text-center">
            © {new Date().getFullYear()} Finance Flow. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
      </div>
  )
}












