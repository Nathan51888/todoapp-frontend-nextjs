"use server"

import { revalidatePath } from "next/cache"

export async function createTodo(prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const res = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify({
            title: title,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })

    const data = await res.json()
    console.log(data)
    revalidatePath('/')

    return {
        title: title
    }
}
