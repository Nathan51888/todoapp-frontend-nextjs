import Login from "../components/login/login";
import Register from "../components/login/register";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession()
    return (
        <div className="flex flex-row justify-center gap-9 pt-36 w-[50vw] h-full bg-white mx-auto ">
            {session ? (
                <div className="w-full max-w-lg">You're already logged in</div>
            ) : (
                <div className="w-full max-w-lg">
                    <Login></Login>
                </div>
            )}
            <div className="w-full max-w-lg">
                <Register></Register>
            </div>
        </div>
    )
}
