import TodoGroup from "@/app/ui/todo-group";

export default function Home() {
    return (
        <main className="mx-auto p-32 w-[40vw] h-full bg-gray-100">
            <h1 className="mx-auto mb-9 text-center text-4xl font-bold">Todo</h1>
            <TodoGroup></TodoGroup>
        </main>
    );
}
