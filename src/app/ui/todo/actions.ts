"use server"

import { createTodo, deleteTodoById, updateTodoCompleted } from "@/app/lib/data"
import { revalidatePath } from "next/cache"

export async function createTodoAction(prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    const data = await createTodo(title)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    revalidatePath('/')

    return {
        title: title
    }
}

export async function updateTodoCompletedAction(id: number, completed: boolean) {
    console.log(id, completed)
    const data = await updateTodoCompleted(id, completed)
    console.log(data)
}

export async function deleteTodoAction(formData: FormData) {
    const id = Number(formData.get("id"))
    const data = await deleteTodoById(id)
    console.log(data)
    revalidatePath("/")
}
