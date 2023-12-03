import { fetchData } from "./user_api";


export async function submissionOfDeliverable(data){
    const response = await fetchData('api/submission/create', {
        method: "POST",
        body: data
    })
    return response
}
export async function firstSubmissionDeliverable(data){
    const response = await fetchData('api/submission/firstSubmission', {
        method: "POST",
        body: data
    })
    return response
}

export async function getSubmissionList(data){
    const response = await fetchData('api/submission/getAllByStudent', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}