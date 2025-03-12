import type { TodoObject } from '@/app/lib/definitions'

export default function Todo({
    todo
}: {
    todo: TodoObject
}) {
    return (
        <div className="flex flex-row gap-5 bg-gray-100 p-3 rounded-lg">
            <input type='checkbox' />
            <p className='flex-grow'>{todo.title}</p>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    );
}
