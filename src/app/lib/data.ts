import { TodoList, TodoObject } from "./definitions";

export async function getAllTodos(): Promise<TodoList> {
    const res = await fetch("http://localhost:8080/todo")
    const data = await res.json()
    return data
}

export async function createTodo(title: string): Promise<TodoObject> {
    const res = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            completed: false,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await res.json()
    console.log(data)
    return data
}

export async function updateTodoCompleted(id: number, completed: boolean): Promise<TodoObject> {
    const res = await fetch(`http://localhost:8080/todo?id=${id}&completed=${completed}`, {
        method: "PUT"
    })
    const data = await res.json()
    console.log(data)
    return data
}

export async function updateTodoTitle(id: number, title: string) {
    const res = await fetch(`http://localhost:8080/todo?id=${id}&title=${title}`, {
        method: "PUT"
    })
    const data = await res.json()
    console.log("updateTodoTitle fetched data: ", data)
    return data
}

export async function deleteTodoById(id: number): Promise<TodoObject> {
    const res = await fetch("http://localhost:8080/todo?id=" + id, {
        method: "DELETE",
    })
    const data = await res.json()
    console.log(data)
    return data
}
