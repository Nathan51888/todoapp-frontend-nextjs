import { cookies } from "next/headers";
import { TodoObjectList, TodoObject, UserProfile } from "./definitions";
import api from "./api";

export async function getUserProfile(): Promise<UserProfile> {
    const res = await api.get("/profile")
    const data = res.data
    console.log("getUserProfile fetched data: ", data)
    return data
}

export async function getAllTodos(): Promise<TodoObjectList> {
    const res = await api.get("http://localhost:8080/todo")
    const data = res.data
    return data
}

export async function createTodo(title: string): Promise<TodoObject> {
    const res = await api.post("http://localhost:8080/todo", {
        body: JSON.stringify({
            title: title,
            completed: false,
        }),
    })
    const data = res.data
    console.log(data)
    return data
}

export async function updateTodoCompleted(id: string, completed: boolean): Promise<TodoObject> {
    const res = await api.put(`http://localhost:8080/todo?id=${id}&completed=${completed}`)
    const data = res.data
    console.log(data)
    return data
}

export async function updateTodoTitle(id: string, title: string) {
    const res = await api.put(`http://localhost:8080/todo?id=${id}&title=${title}`)
    const data = res.data
    console.log("updateTodoTitle fetched data: ", data)
    return data
}

export async function deleteTodoById(id: string): Promise<TodoObject> {
    const res = await api.delete("http://localhost:8080/todo?id=" + id)
    const data = res.data
    console.log(data)
    return data
}
