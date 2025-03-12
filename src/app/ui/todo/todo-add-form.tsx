'use client'

import { useActionState } from "react"
import { createTodo } from "./actions"

export default function TodoAddForm() {
    const [state, formAction, isPending] = useActionState(createTodo, {
        title: "",
    })
    return (
        <form action={formAction} className="flex flex-col items-center">
            <input type="text" name="title" id="title" className="w-[60%]" />
            <button type="submit" disabled={isPending}>Add todo</button>
            {isPending ? "Submitting..." : `Added todo: "${state.title}"`}
        </form>
    )
}
