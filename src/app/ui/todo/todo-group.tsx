'use client'

import { use, useEffect, useState, } from "react";
import { TodoList } from '@/app/lib/definitions'
import Todo from "@/app/ui/todo/todo";

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
    })

    useEffect(() => {
        console.log("todoList updated", todoList)
    }, [todoList])

    return (
        <div>
            {todoList && todoList.map((item, index) => (
                <Todo key={index} todo={item}></Todo>
            ))}
        </div>
    )
}
