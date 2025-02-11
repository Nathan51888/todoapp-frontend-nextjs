import type { TodoObject } from '@/app/lib/definitions'

export default function Todo({ handleOnTitleChange, handleOnDeleteClick, item }: { handleOnTitleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void, handleOnDeleteClick: (id: number) => void, item: TodoObject }) {
    return (
        <div className="flex flex-row gap-5 bg-gray-100 p-3 rounded-lg">
            {item.completed && <p>Y</p> || <p>N</p>}
            <input type='text' defaultValue={item.title} onChange={(e) => handleOnTitleChange(e, item.id)} className='flex-grow' />
            <button onClick={() => handleOnDeleteClick(item.id)}>Delete</button>
        </div>
    );
}
