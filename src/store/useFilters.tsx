import { create } from 'zustand';


interface Filters{
  search:string;
  type:string;
  order:string;
  getUrl: () => string;
  setSearch: (search:string) => void;
  setType: (type:string) => void;
  setOrder: (order:string) => void;
}

const useFilters = create<Filters>()(
    (set,get) => ({
      // Estado inicial
      search: '',
      type: '',
      order: '',

      setSearch: (search: string) => set({ search }),
      setType: (type: string) => set({ type }),
      setOrder:(order:string) => set({ order }),
      resetParams: () => set({search:'',type:'',order:''}),
      getUrl: () => {
        let { search, type, order } = get(); // Acceder a los valores actuales


        return `/transactions?search=${search}&type=${type}&order=${order}`; // Construir la URL
    },
      
      
    }),
);

export default useFilters;



