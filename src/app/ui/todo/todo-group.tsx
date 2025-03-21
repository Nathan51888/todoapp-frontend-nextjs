'use client'

import { use, useEffect, useState, } from "react";
import { TodoList } from '@/app/lib/definitions'
import TodoItem from "./todo-item";

export default function TodoGroup({
    data
}: {
    data: Promise<TodoList>
}) {
    const fetchedTodoList = use(data)
    const [todoList, setTodoList] = useState<TodoList>([]);

    useEffect(() => {
        setTodoList(fetchedTodoList)
        console.log("fetched data: ", fetchedTodoList)
        console.log("todoListState", todoList)
    }, [fetchedTodoList])

    useEffect(() => {
        console.log("todoList updated", todoList)
    }, [todoList])

    return (
        <div>
            {todoList?.length && todoList.map((item, index) => (
                <TodoItem key={item.id} todo={item}></TodoItem>
            ))}
        </div>
    )
}
