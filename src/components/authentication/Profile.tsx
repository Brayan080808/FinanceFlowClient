import { useState } from 'react';
import { Settings, HelpCircle, LogOut } from 'lucide-react';
import useUser from '../../store/useUser';
import serverUrl from '../../service/server';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const user = useUser();
  const [showInfo,setShowInfo] = useState(false);


  const handleLogoutButton = async () => {
    try{
      await serverUrl.get('users/logout/')
      user.setLogout()
    }
    catch(error){
      console.log(error)
    }
  }

  const handleConfigButton = () => {
    navigate('/account/config/')
  }

  

  const handleInfoButton = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="relative inline-block text-left text-black">
      <button onClick={handleInfoButton} className="relative h-8 w-8 rounded-full bg-transparent focus:outline-none">
        <img
          src={user.picture}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
      </button>

      <div className={`${showInfo ? ' animate-fade-in': ' animate-fade-out pointer-events-none '} absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg `}>
        <div className="px-4 py-2">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">
            {user.mail}
          </p>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="py-1">
          
          <button onClick={handleConfigButton} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </button>
          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ayuda</span>
          </button>
        </div>
        <div className="border-t border-gray-200"></div>
          <button onClick={handleLogoutButton} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </button>
      </div>
    </div>
  );
}