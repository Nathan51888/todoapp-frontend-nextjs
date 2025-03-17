"use client"

import { useActionState } from "react"
import { sendUserRegister } from "./actions"

export default function Register() {
    const [error, action, isPending] = useActionState(sendUserRegister, "")
    return (
        <div className="w-auto p-7 bg-slate-400 align-middle">
            <h2 className="text-center font-bold text-4xl">Register</h2>
            <form action={action} className="flex flex-col w-[80%] m-auto">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" />
                <button type="submit" disabled={isPending} className="mt-4 px-8 py-3 bg-slate-50 w-fit rounded-lg self-center">{isPending ? "Submitting" : "Login"}</button>
            </form>
            <p>{error}</p>
        </div>
    )
}
