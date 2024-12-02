import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name?: string;
  picture?: string;
  mail?: string
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  setName: (userName: string) => void;
  setPicture: (userPicture: string) => void;
  setMail:(mail: string) => void;
  setLogout: () => void;
}

const useUser = create<UserState>()(
  persist(
    (set) => ({
      // Estado inicial
      name: " ",
      picture: " ",
      mail:" ",
      theme: 'light',
      setTheme: (theme: 'light' | 'dark') => set({theme}),
      setName: (name: string) => set({ name }),
      setPicture: (picture: string) => set({ picture }),
      setMail: (mail: string) => set({ mail }),
      setLogout: () => set({name:" ",picture:" ",mail:" ", theme: 'light'})
    }),
    {
      name: 'sesion', // Nombre para el almacenamiento
    }
  )
);

export default useUser;



