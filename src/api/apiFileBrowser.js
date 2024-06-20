import axios from "axios"

const apiFileBrowser = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})


export default apiFileBrowser