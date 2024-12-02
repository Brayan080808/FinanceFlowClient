import { useState, useEffect } from 'react'
import { Menu, Home, ArrowRightLeft, MessageSquare, Settings, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../store/useUser'

interface NavItem {
  name: string
  path: string
  icon: JSX.Element
}

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { theme } = useUser();

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Currency Converter', path: '/currencyConverter', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Settings', path: '/account/config/', icon: <Settings className="w-5 h-5" /> },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar')
      const menuButton = document.getElementById('menu-button')
      if (sidebar && !sidebar.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className={`f top-4 left-4 p-2 rounded-lg   transition-colors duration-200 z-50 ${theme === "dark" ? "hover:bg-gray-700 " : "hover:bg-gray-100"} `}
      >
        <Menu className={` ${theme === "dark" ? "text-gray-300" : "text-gray-600"} w-6 h-6 `} />
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-[-15px] h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${theme==="dark" ? "bg-gray-800" : "bg-white"} `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 pl-7 border-b ${theme === "dark" ? "border-gray-700" : "" } `}>
            <h2 className="flex items-center">
                <span className="text-[#40CFA4] text-2xl font-bold">Finance</span>
                <span className={`${theme === "dark" ? "text-white" : "text-gray-700 "} text-2xl font-bold `}>Flow</span>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-lg  transition-colors duration-200 ${ theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100" } `}
            >
              <X className={`w-5 h-5  ${theme === "dark" ? "text-gray-300" : "text-gray-600"} `} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                       
                      transition-all duration-200 group ${theme==="dark" ? "hover:bg-[#40CFA4]/20 text-gray-200" : "text-gray-700 hover:bg-[#40CFA4]/10 hover:text-[#40CFA4] "} `}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t ${theme==="dark" ? "border-gray-700" : ""} `}>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${ theme === "dark" ? "bg-gray-700" : "bg-gray-50" } `}>
              <div className="w-8 h-8 rounded-full bg-[#FF6B8B] flex items-center justify-center text-white font-medium">
                B
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme==="dark" ? "text-white" : "text-gray-900"} `}>Bryan Smith</p>
                <p className={`text-xs ${theme==="dark" ? "text-gray-400" : "text-gray-500" } `}>Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}