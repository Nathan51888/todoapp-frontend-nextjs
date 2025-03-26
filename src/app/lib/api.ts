"use server"
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

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
        const session = await getServerSession(authOptions)
        console.log(session)
        const accessToken = session?.accessToken
        if (accessToken) {
            config.headers.Authorization = `${accessToken}`
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
                // FIXME: put this logic in authOptions so it updates session accessToken
                const session = await getServerSession(authOptions)
                if (session === null) throw new Error("User not logged in")
                const { data } = await axios.post("http://localhost:8080/refresh-token", { refreshToken: session?.refreshToken })
                // call Next Auth session: trigger jwt callback
                session.accessToken = data.accessToken
                // Retry the original request with new token
                originalRequest.headers.Authorization = `${data.accessToken}`
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
