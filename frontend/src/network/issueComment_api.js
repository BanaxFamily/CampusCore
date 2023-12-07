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