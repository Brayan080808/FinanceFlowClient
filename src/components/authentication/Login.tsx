import { Github } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import serverUrl from '../../service/server';
import { useNavigate } from 'react-router-dom';
import useUser from '../../store/useUser';
import { useState } from 'react';
import { XCircle,X } from 'lucide-react';
import Logo from '../Logo'
import Spiner from '../Spiner'
import usePostLogin from '../../hooks/usePostLogin'


export default function Login() {
  const user = useUser();
  const navigate = useNavigate(); 
  const [showErrorNotification,setShowErrorNotification] = useState<boolean>(false);
  const { mutate, data, isSuccess, isPending } = usePostLogin();

  const handleSocialLogin = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID_GITHUB;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    window.location.assign(url);
  };

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const provider = params.get('provider')

  console.log("Que esta pasando?")
  console.log("isSuccess",isSuccess)

  if(isSuccess){
    user.setName(data?.data.name)
    user.setPicture(data?.data.picture)
    console.log(data?.data)

    if(data?.data.mail){
      user.setMail(data?.data.mail)
    }

    console.log("Vamoos bien")

    if (data?.status === 200){
      navigate('/dashboard/') 
    }
    else if (data?.status === 201){
      navigate('/account/config/')
    }
  }
  else if(code && provider && user.name == " " && !isPending){
    console.log("else if")
    mutate({code,provider})

  }


  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        });
        const response = await serverUrl.post('users/login',{
          'idProvider':data.id,
          "siteProvider":"Google"
        })

        user.setName(data.name)
        user.setPicture(data.picture)
        user.setMail(data.email)

        if (response.status === 200){
          navigate('/dashboard/') 
        }
        else if (response.status === 201){
          navigate('/account/config/')
        }
        
        
    }
});


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">  
            <Logo />
          </div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">EconomyTracker</h1>
          <p className="text-center text-gray-600 mb-8">
            Gestiona tus finanzas con estilo
          </p>
          <div className="space-y-4">
            <button
              onClick={() => login()}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Continuar con Google
            </button>
            {/* <button
              onClick={() => handleSocialLogin('LinkedIn')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Continuar con LinkedIn
            </button> */}
            <button
              onClick={handleSocialLogin}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Github className="w-5 h-5 mr-2" />
              Continuar con GitHub
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600">
              Al iniciar sesión, aceptas nuestros{' '}
              <a href="#" className="underline text-blue-500 hover:text-blue-600">
                Términos de servicio
              </a>{' '}
              y{' '}
              <a href="#" className="underline text-blue-500 hover:text-blue-600">
                Política de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
      { isPending && (
          <div className='absolute w-full h-full flex justify-center items-center bg-opacity-40 bg-white pointer-events-none'>
              <Spiner />
          </div>
      ) }


      {showErrorNotification && (
          <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 z-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
              <XCircle size={24} className="mr-3" />
              <span className="font-medium">Error al guardar la configuración. Por favor, inténtalo de nuevo.</span>
              <button
                onClick={() => setShowErrorNotification(false)}
                className="ml-4 text-white hover:text-red-200 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
    </div>
  )
}



