"use client"

import { TodoObject } from '@/app/lib/definitions';
import { updateTodoCompletedAction } from './actions';
import { ChangeEvent } from 'react';

export function TodoCheckboxForm({ todo }: { todo: TodoObject }) {
    function handleToggle(e: ChangeEvent<HTMLInputElement>) {
        updateTodoCompletedAction(todo.id, e.currentTarget.checked)
    }
    return (
        <>
            <input type='checkbox' name='completed' defaultChecked={todo.completed} onChange={handleToggle} />
        </>
    )
}
