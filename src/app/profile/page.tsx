"use server"

import { getUserProfile } from "../lib/data"

export default async function Profile() {
    const data = await getUserProfile()
    console.log("Page: ", data)
    return (
        <div className="bg-white">
            <h1>Profile</h1>
            <p>Email: {data.email}</p>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            <p>Birthday: {data.birthday}</p>
        </div>
    )
}
