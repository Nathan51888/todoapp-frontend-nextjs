import type { TodoObject } from '@/app/lib/definitions'
import { TodoDeleteForm } from './todo-delete-form';
import { TodoCheckboxForm } from './todo-checkbox-form';

export default function Todo({
    todo
}: {
    todo: TodoObject
}) {
    return (
        <div className="flex flex-row gap-5 bg-gray-100 p-3 rounded-lg">
            <TodoCheckboxForm todo={todo}></TodoCheckboxForm>
            <p className='flex-grow'>{todo.title}</p>
            <TodoDeleteForm id={todo.id}></TodoDeleteForm>
        </div>
    );
}
