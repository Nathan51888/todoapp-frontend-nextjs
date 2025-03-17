"use server"

export async function sendUserLogin(error: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    await new Promise(resolve => setTimeout(resolve, 500))
    const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    if (!res.ok) return res.text()
    const data = await res.json()
    console.log(data)
}
