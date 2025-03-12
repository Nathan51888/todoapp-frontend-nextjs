import { TodoList } from "./definitions";

export async function getAllTodos(): Promise<TodoList> {
    const res = await fetch("http://localhost:8080/todo")
    const data = await res.json()
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return data
}

export async function createTodo(previousState: string, formData: FormData) {
    console.log(previousState)
    const title = formData.get("title") as string
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
    return previousState
}

