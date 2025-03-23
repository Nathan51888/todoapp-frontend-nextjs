import { Suspense } from "react";
import { TodoObjectList } from "../lib/definitions";
import { getAllTodos } from "../lib/data";
import TodoAddForm from "../components/todo/todo-add-form";
import TodoList from "../components/todo/todo-list";

export default async function Home() {
    const data: Promise<TodoObjectList> = getAllTodos()

    return (
        <main className="mx-auto p-32 w-[40vw] h-full bg-gray-100">
            <h1 className="mx-auto  mb-9 text-center text-4xl font-bold">Todo</h1>
            <TodoAddForm></TodoAddForm>
            <div className="flex flex-col gap-6 h-full bg-gray-200 p-10 px-20 rounded-lg">
                <Suspense fallback={<div>Loading...</div>}>
                    <TodoList data={data}></TodoList>
                </Suspense>
            </div>
        </main>
    );
}
