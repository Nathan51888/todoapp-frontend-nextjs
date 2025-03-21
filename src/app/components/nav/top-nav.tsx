import Link from "next/link";

export default function TopNav() {
    return (
        <nav className="flex justify-start items-center gap-3 w-full p-6 bg-slate-500">
            <Link href={"/"} className="bg-white">Todos</Link>
            <Link href={"/login"} className="bg-white">Login</Link>
            <Link href={"/profile"}>Profile</Link>
        </nav>
    )
}
