import {fetchData} from "./user_api"

export async function getUserRoles(role){
    const response = await fetchData("api/auth/getByRole", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(role)
    })

    return response;
}