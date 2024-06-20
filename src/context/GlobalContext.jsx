import { createContext } from "react"
import useStore from "../store/useStore"

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {

    const store = useStore()


    return (
        <GlobalContext.Provider 
            value={{
                store
            }}
        >
            { children }
        </GlobalContext.Provider>
    )

}

export {
    GlobalContextProvider
}


export default GlobalContext