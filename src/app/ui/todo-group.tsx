'use client'

import { useEffect, useState, } from "react";
import { TodoList } from '@/app/lib/definitions'
import Todo from "@/app/ui/todo";

export default function TodoGroup() {
    const initialList: TodoList = [{ id: 1, completed: true, title: "todo1" }, { id: 2, completed: false, title: "todo2" }, { id: 3, completed: true, title: "todo3" }]
    const [todoList, setTodoList] = useState<TodoList>(initialList);

    useEffect(() => {
        console.log(todoList)
    }, [todoList])

    const addTodo = () => {
        const modifiedList = [...todoList];

        let newId;
        if (modifiedList.length <= 0) {
            newId = 0;
        }
        else {
            newId = modifiedList[modifiedList.length - 1].id + 1;
        }

        modifiedList.push({ id: newId, title: "test add", completed: true })

        setTodoList(modifiedList);
    }

    function handleOnDeleteTodo(id: number) {
        console.log(`id: ${id}`);
        const modifiedList = [...todoList];
        const todoIndex = modifiedList.findIndex((element) => element.id === id);

        modifiedList.splice(todoIndex, 1);

        console.log(`index: ${todoIndex}`);
        console.log(modifiedList);

        setTodoList(modifiedList);
    }


    const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        // change title
        console.log("title changed to:" + e.target.value);

    }

    return (
        <div className="flex flex-col gap-6 h-full bg-gray-200 p-10 px-20 rounded-lg">
            <button onClick={addTodo}>Add</button>
            {todoList.map((item, index) => (
                <Todo key={index} handleOnTitleChange={handleOnTitleChange} handleOnDeleteClick={handleOnDeleteTodo} item={item}></Todo>
            ))}
        </div>
    )
}
