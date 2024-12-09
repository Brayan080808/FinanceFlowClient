import Stadicts from './components/dashboard/Stadicts'
import Login from './components/authentication/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AccountConfig from './components/acount/config';
import useUser from './store/useUser';
import serverUrl from './service/server';
import { useQuery } from '@tanstack/react-query';
import Spiner from './components/Spiner'
import CurrencyConverter from './components/currencyConverter/CurrencyConverter'
import Base from './components/Base'
import Contact from './components/contact/Contact'

function App() {
  const user = useUser()

  const { isLoading, isError } = useQuery({ 
    queryKey: ['login',user.name], 
    queryFn: () => serverUrl.get('users/access/'),
    enabled: user.name != " " , // Solo se ejecuta si userId no es null o undefined
})  


  if(isLoading) return(
                        <div className=' w-screen h-screen flex justify-center items-center'>
                            <Spiner />
                        </div>
                      )

  if(isError) user.setLogout()

  return (
    <div className=' overflow-hidden '>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Base  />}>
                <Route path='dashboard' element={
                  user.name == " " ? <Navigate to={'/login'} />
                                         : <Stadicts />
                  }
                /> 
                <Route path='currencyConverter' element={<CurrencyConverter />} />   

                <Route path='contact' element={<Contact />} />
              </Route>
              
              <Route path='login' element={<Login />} />


 
              <Route path='account/config/' element={
                user.name == " " ? <Navigate to={'/login'} />
                                       : <AccountConfig />
                } />              

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;




