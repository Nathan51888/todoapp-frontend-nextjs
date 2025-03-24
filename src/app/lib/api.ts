import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    async (config) => {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")
        if (accessToken) {
            config.headers.Authorization = `${accessToken.value}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const cookieStore = await cookies()
                const refreshToken = cookieStore.get("refreshToken")
                const res = await axios.post("http://localhost:8080/refresh-token", { refreshToken }, { withCredentials: true })
                const { accessToken } = res.data

                // Set access token to session cookie
                cookieStore.set({
                    name: "accessToken",
                    value: accessToken,
                    httpOnly: true,
                    secure: true,
                    path: "/",
                })

                // Retry the original request with new token
                originalRequest.headers.Authorization = `${accessToken}`
                return axios(originalRequest)
            } catch (error) {
                // Handle refresh token error or redirect to login
                console.log(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api
