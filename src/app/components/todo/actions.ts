"use server"

import { createTodo, deleteTodoById, updateTodoCompleted, updateTodoTitle } from "@/app/lib/data"
import { revalidatePath } from "next/cache"

export async function createTodoAction(prevState: any, formData: FormData) {
    const title = formData.get("title") as string
    if (title === "") return { title: "" }
    const data = await createTodo(title)
    console.log(data)
    revalidatePath('/')

    return {
        title: title
    }
}

export async function updateTodoCompletedAction(id: string, completed: boolean) {
    console.log(id, completed)
    const data = await updateTodoCompleted(id, completed)
    console.log(data)
    revalidatePath("/")
}

export async function updateTodoTitleAction(formData: FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const data = await updateTodoTitle(id, title)
    console.log("action data: ", data)
}

export async function deleteTodoAction(formData: FormData) {
    const id = formData.get("id") as string
    const data = await deleteTodoById(id)
    console.log(data)
    revalidatePath("/")
}
