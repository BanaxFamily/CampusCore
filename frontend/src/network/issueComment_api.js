import { fetchData } from "./user_api";


export async function getComments(data){
    const response = await fetchData("api/issueComment/getCommentsForIssue", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}
export async function addIssueComment(data){
    const response = await fetchData("api/issueComment/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}