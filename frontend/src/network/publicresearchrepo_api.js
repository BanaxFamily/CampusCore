import { fetchData } from "./user_api";

export async function addRequestUpload(data){
    const response = await fetchData("api/repository/requestUpload", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    return response
}