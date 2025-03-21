"use client"

import { useActionState, useRef } from "react";
import { ActionResponse, sendUserLogin } from "./actions";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "@/app/lib/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: ActionResponse = {
    success: false,
    message: "",
}

export default function Login() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const formRef = useRef<HTMLFormElement>(null)
    const [state, action, isPending] = useActionState(sendUserLogin, initialState)
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-4xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        ref={formRef}
                        action={action}
                        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
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
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>{isPending ? "Submitting" : "Login"}</Button>
                    </form>
                </Form>
                <p>{state.message}</p>
                {state?.errors && (
                    <p>{state?.errors}</p>
                )}
                <p>{isPending ? "Pending..." : "Done"}</p>
            </CardContent>
        </Card>
    )
}
