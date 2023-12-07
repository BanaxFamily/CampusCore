import { fetchData } from "./user_api";

export async function addNewIssue(data){
    const response = await fetchData('api/issue/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}
export async function getAllIssue(data){
    const response = await fetchData('api/issue/getAllBySubmission', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}