import Link from "next/link";

export default function TopNav() {
    return (
        <nav className="flex justify-start items-center gap-3 w-full p-6 bg-slate-500">
            <Link href={"/"}>Home</Link>
            <Link href={"/dashboard"}>Dashboard</Link>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
            <Link href={"/profile"}>Profile</Link>
        </nav>
    )
}
