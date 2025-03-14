import { deleteTodoAction } from "./actions";

export function TodoDeleteForm({ id }: { id: number }) {
    return (
        <form action={deleteTodoAction}>
            <input type="hidden" name="id" value={id} />
            <button>Delete</button>
        </form>
    )
}
