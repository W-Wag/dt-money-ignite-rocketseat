import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../lib/api";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
transactions: Transaction[],
fetchTransactions: (query?: string) => Promise<void>
createTransaction: (data: CreateTransactionsInput) => Promise<void>
}

export const TransactionsContext = createContext<TransactionContextType>({} as TransactionContextType)

interface TransactionsProviderProps {
    children: ReactNode
}

interface CreateTransactionsInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

export function  TransactionsProvide({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
       const response = await api.get('/transactions', {
        params: {
            q: query,
            _sort: 'createdAt',
            _order: 'desc'
        }
       })
        
        setTransactions(response.data)
    }

    async function createTransaction(data: CreateTransactionsInput) {
        const {description, price, category, type} = data
        try {
            const response = await api.post('transactions', {
                description,
                price,
                category,
                type,
                createdAt: new Date()
            })

            setTransactions((state) => [response.data, ...state])
          
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])
    return (
        <TransactionsContext.Provider value={{
             transactions,
             fetchTransactions,
             createTransaction
             }}>
        {children}
    </TransactionsContext.Provider>
    )
}