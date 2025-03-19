import { cookies } from "next/headers";
import { TodoList, TodoObject, UserProfile } from "./definitions";

export async function getUserProfile(): Promise<UserProfile> {
    // TODO: use middleware for Authorization
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: { "Authorization": token?.value as string },
    })
    const data = await res.json()
    console.log("Data: ", data)
    return data
}

export async function getAllTodos(): Promise<TodoList> {
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch("http://localhost:8080/todo", {
        method: "GET",
        headers: { "Authorization": token?.value as string }
    })
    const data = await res.json()
    return data
}

export async function createTodo(title: string): Promise<TodoObject> {
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            completed: false,
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": token?.value as string,
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}

export async function updateTodoCompleted(id: string, completed: boolean): Promise<TodoObject> {
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch(`http://localhost:8080/todo?id=${id}&completed=${completed}`, {
        method: "PUT",
        headers: { "Authorization": token?.value as string }
    })
    const data = await res.json()
    console.log(data)
    return data
}

export async function updateTodoTitle(id: string, title: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch(`http://localhost:8080/todo?id=${id}&title=${title}`, {
        method: "PUT",
        headers: { "Authorization": token?.value as string }
    })
    const data = await res.json()
    console.log("updateTodoTitle fetched data: ", data)
    return data
}

export async function deleteTodoById(id: string): Promise<TodoObject> {
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch("http://localhost:8080/todo?id=" + id, {
        method: "DELETE",
        headers: { "Authorization": token?.value as string }
    })
    const data = await res.json()
    console.log(data)
    return data
}
