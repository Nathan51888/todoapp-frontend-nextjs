import { TodoObject } from "@/app/lib/definitions";
import { updateTodoTitleAction } from "./actions";

export default function TodoEditForm({ todo }: { todo: TodoObject }) {
    return (
        <form action={updateTodoTitleAction} className="flex-grow">
            <input type="hidden" name="id" value={todo.id} />
            <input className={todo.completed ? "line-through" : ""} type="text" name="title" defaultValue={todo.title} />
        </form>
    )
}
