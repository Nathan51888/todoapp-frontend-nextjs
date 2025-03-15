import type { TodoObject } from '@/app/lib/definitions'
import { TodoDeleteForm } from './todo-delete-form';
import { TodoCheckboxForm } from './todo-checkbox-form';
import TodoEditForm from './todo-edit-form';

export default function TodoItem({
    todo
}: {
    todo: TodoObject
}) {
    return (
        <div className="flex flex-row gap-5 bg-gray-100 p-3 rounded-lg">
            <TodoCheckboxForm todo={todo}></TodoCheckboxForm>
            <TodoEditForm todo={todo}></TodoEditForm>
            <TodoDeleteForm id={todo.id}></TodoDeleteForm>
        </div>
    );
}
