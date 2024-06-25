import { createContext, useEffect, useState } from "react"
import useStore from "../store/useStore"
import SockJS from "sockjs-client"
import Stomp from 'stompjs'
const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {

    const store = useStore()
    const [loading, setLoading] = useState(true)

    const { setClientWs, setFiles } = store;

    useEffect(() => {

        if (loading) {
            const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);
            const client = Stomp.over(socket);

            client.debug = null;

            client.connect({}, () => {
                setClientWs(client)


                client.subscribe("/topic/files", (message) => {
                    const response = JSON.parse(message.body)
                    setFiles(response)
                })

            })


            setLoading(false)
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                store
            }}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export {
    GlobalContextProvider
}


export default GlobalContext