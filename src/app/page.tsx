import TodoGroup from "@/app/components/todo/todo-group";
import { TodoList } from "./lib/definitions";
import { Suspense } from "react";
import { getAllTodos } from "./lib/data";
import TodoAddForm from "./components/todo/todo-add-form";

export default async function Home() {
    const data: Promise<TodoList> = getAllTodos()

    return (
        <main className="mx-auto p-32 w-[40vw] h-full bg-gray-100">
            <h1 className="mx-auto  mb-9 text-center text-4xl font-bold">Todo</h1>
            <TodoAddForm></TodoAddForm>
            <div className="flex flex-col gap-6 h-full bg-gray-200 p-10 px-20 rounded-lg">
                <Suspense fallback={<div>Loading...</div>}>
                    <TodoGroup data={data}></TodoGroup>
                </Suspense>
            </div>
        </main>
    );
}
