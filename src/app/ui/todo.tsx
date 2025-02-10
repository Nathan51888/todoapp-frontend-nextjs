export default function Todo({ enabled, title }: { enabled: boolean, title: string }) {
    return (
        <div className="flex flex-row gap-5 bg-gray-100 p-3 rounded-lg">
            {enabled && <p>Y</p> || <p>N</p>}
            <p className="flex-grow">{title}</p>
            <a>Delete</a>
        </div>
    );
}
