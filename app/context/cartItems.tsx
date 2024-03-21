'use client'
import Item from "@/lib/modals/item"
import { createContext,useContext,Dispatch,SetStateAction,useState } from "react"

type DataType = {
    name: string,
    price: number,
    image: string,
    _id: string
   }

interface ContextPropes {
    cartItems:DataType[],
    setCartItems:Dispatch<SetStateAction<DataType[]>>
}
const GlobalContext = createContext<ContextPropes>({
    cartItems: [],
    setCartItems: (): DataType[]=>[]
})

export const GlobalContextProvider = ({children}) => {
    const [cartItems,setCartItems] = useState<[] | DataType[]>([])
    return (
        <GlobalContext.Provider value={{cartItems,setCartItems}}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = ()=> useContext(GlobalContext);
