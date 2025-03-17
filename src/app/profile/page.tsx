"use server"

import { cookies } from "next/headers"

export default async function Profile() {
    // TODO: use middleware for Authorization
    const cookieStore = await cookies()
    const token = cookieStore.get("refreshToken")
    const res = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: { "Authorization": token?.value as string },
    })
    const data = await res.json()
    console.log(data)
    return (
        <div>Profile</div>
    )
}
