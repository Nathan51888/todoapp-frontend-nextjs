import Login from "../ui/login/login";
import Register from "../ui/login/register";

export default function Page() {
    return (
        <div className="pt-36 w-[50vw] h-full bg-white mx-auto">
            <Login></Login>
            <Register></Register>
        </div>
    )
}
