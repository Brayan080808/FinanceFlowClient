import { createRoot } from 'react-dom/client'
// @ts-ignore
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_AUTH2_ID}>
      <QueryClientProvider client={queryClient}>

        <App />
      
      </QueryClientProvider>
    </GoogleOAuthProvider>
)
