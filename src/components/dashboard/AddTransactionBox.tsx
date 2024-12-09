import { useEffect, useState } from "react";
import useCategories from "../../hooks/useCategories";
import { useForm } from 'react-hook-form';
import useUser from "../../store/useUser";

type TransactionType = "expense" | "income";

interface Transaction {
    name: string;
    amount: number;
    category: string;
}

interface AddTransactionBox{
    mutate: () => void;
}


export default function AddTransactionBox({ mutate }) {
    const { spendingCategory } = useCategories();
    const { register, handleSubmit, reset } = useForm();
    const [type,setType] = useState<TransactionType>("expense")
    const handleType = (type:TransactionType) => {
        setType(type)
    }
    const { theme } = useUser();


    useEffect(() => {
         reset({ category: "" }); // Resetear los campos al cambiar el tipo
    }, [type]); // Asegúrate de incluir reset en las dependencias


    const AddTransaction = async (data:Transaction) => {
        await mutate(data);

    };

    return (
        <form className="mb-4 space-y-4" onSubmit={handleSubmit(AddTransaction)}>
            <input
                type="text"
                placeholder="Nombre de la transacción"
                id="name"
                {...register("name", { required: true })} // Registro con validación
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
            />
            <input
                type="number"
                placeholder="Amount"
                id="amount"
                {...register("amount", { required: true, valueAsNumber: true })} // Registro con validación
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
            />
            <select
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                value={type}
                onChange={(e) => handleType(e.target.value as TransactionType)}
            >
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
            </select>
            <select
                {...register("category", { required: true })} // Registro con validación
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
            >
                <option value="">Seleccionar categoría</option>
                {type === "expense" ?                    
                    spendingCategory
                    .filter(category => category.income === false)
                    .map((category, key) => (
                        <option key={key} value={category.category}>{category.category}</option>
                    ))
                    :
                    spendingCategory
                    .filter(category => category.income === true)
                    .map((category, key) => (
                        <option key={key} value={category.category}>{category.category}</option>
                    ))
                }
            </select>

            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Guardar Transacción
            </button>
        </form>
    );
}



