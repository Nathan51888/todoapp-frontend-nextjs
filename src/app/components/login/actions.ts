"use server"

import { loginSchema } from "@/app/lib/schema"
import { signIn } from "next-auth/react"
import { cookies } from "next/headers"

export type ActionResponse = {
    success: boolean,
    message: string,
    errors?: string,
    inputs?: LoginFormData,
}

type LoginFormData = {
    email: string,
    password: string,
}

type RegisterFormData = {
    email: string,
    password: string,
}

export async function sendUserLogin(prevState: any, formData: FormData): Promise<ActionResponse> {
    // fake delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const rawData: LoginFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const parsed = loginSchema.safeParse(rawData)
    console.log(parsed)
    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid form data",
        }
    }

    // next auth
    // const result = await signIn("credentials", {
    //     redirect: false,
    //     email: rawData.email,
    //     password: rawData.password,
    // })
    // if (!result?.ok) {
    //     return {
    //         success: false,
    //         message: "Failed to login",
    //         errors: result?.error as string,
    //     }
    // }

    const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
            email: rawData.email,
            password: rawData.password,
        })
    })
    if (!res.ok) {
        return {
            success: false,
            message: "Failed to submit form",
            errors: await res.text(),
            inputs: rawData,
        }
    }
    const data = await res.json()
    const accessToken = data.token
    const refreshToken = data.refreshToken
    console.log("accessT: ", accessToken)
    console.log("refreshT: ", refreshToken)

    const cookieStore = await cookies()
    cookieStore.set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        secure: true,
        path: "/"
    })
    cookieStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: true,
        path: "/"
    })
    return {
        success: true,
        message: "Login success",
    }
}
export async function sendUserRegister(prevState: any, formData: FormData): Promise<ActionResponse> {
    // fake delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const rawData: RegisterFormData = {
        // firstName: "Joe",
        // lastName: "Mama",
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const parsed = loginSchema.safeParse(rawData)
    console.log(parsed)
    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid form data",
        }
    }
    const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify(rawData)
    })
    if (!res.ok) {
        return {
            success: false,
            message: "Failed to submit form",
            errors: await res.text(),
            inputs: rawData,
        }
    }
    return {
        success: true,
        message: "Register success"
    }
}
