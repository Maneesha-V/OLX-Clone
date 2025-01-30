import { createContext, ReactNode, useState } from "react"
interface MenuContextType {
    menu: string; 
    setMenu: React.Dispatch<React.SetStateAction<string>>; 
}
export const MenuContext = createContext<MenuContextType|null>(null)
interface MenuProviderProps {
    children: ReactNode;
}
export const MenuProvider = (({children}:MenuProviderProps)=>{
    const [menu,setMenu] = useState<string>("")
    return (
        <MenuContext.Provider value={{menu,setMenu}}>
            {children}
        </MenuContext.Provider>
    )
})