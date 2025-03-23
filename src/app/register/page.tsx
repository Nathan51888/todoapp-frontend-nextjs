import Register from "../components/login/register";

export default function Page() {
    return (
        <div className="flex flex-row justify-center gap-9 pt-36 w-[50vw] h-full bg-white mx-auto ">
            <div className="w-full max-w-lg">
                <Register></Register>
            </div>
        </div>
    )
}
