import Todo from "@/app/ui/todo";

export default function TodoGroup() {
    const list = [{ enabled: true, title: "todo1" }, { enabled: false, title: "todo2" }, { enabled: true, title: "todo3" }]
    return (
        <div className="flex flex-col gap-6 h-full bg-gray-200 p-10 px-20 rounded-lg">
            {list?.map((element) => (
                <Todo enabled={element.enabled} title={element.title}></Todo>
            ))}
        </div>
    )
}
