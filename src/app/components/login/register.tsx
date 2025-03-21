"use client"

import { startTransition, useActionState } from "react"
import { ActionResponse, sendUserRegister } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { LoginSchema, loginSchema } from "@/app/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"

const initialState: ActionResponse = {
    success: false,
    message: "",
}

export default function Register() {
    const [state, formAction, isPending] = useActionState(sendUserRegister, initialState)
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(state.inputs ?? {}),
        }
    })

    async function onSubmit(data: LoginSchema) {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))
        startTransition(() => formAction(formData))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        action={formAction}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <p>{state.message}</p>
                            {state?.errors && (
                                <p className="text-red-500">{state?.errors}</p>
                            )}
                        </div>
                        <Button type="submit" disabled={isPending}>{isPending ? "Submitting" : "Login"}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
