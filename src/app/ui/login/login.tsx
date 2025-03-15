export default function Login() {
    return (
        <div className="w-auto p-7 bg-slate-400 align-middle">
            <h2 className="text-center font-bold text-4xl">Login</h2>
            <form className="flex flex-col w-[80%] m-auto">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" />
                <button type="submit" className="mt-4 px-8 py-3 bg-slate-50 w-fit rounded-lg self-center">Login</button>
            </form>
        </div>
    )
}
