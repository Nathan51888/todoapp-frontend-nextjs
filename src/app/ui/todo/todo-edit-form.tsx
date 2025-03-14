import { updateTodoTitleAction } from "./actions";

export default function TodoEditForm({ id, title }: { id: number, title: string }) {
    return (
        <form action={updateTodoTitleAction} className="flex-grow">
            <input type="hidden" name="id" value={id} />
            <input type="text" name="title" defaultValue={title} />
        </form>
    )
}
