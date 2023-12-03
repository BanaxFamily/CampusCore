import { fetchData } from "./user_api";


export async function submissionOfDeliverable(data){
    const response = await fetchData('api/submission/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data)
    })
    return response
}
export async function firstSubmissionDeliverable(data){
    const response = await fetchData('api/submission/firstSubmission', {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
        },
        body:  data
    })
    return response
}

export async function getAllSubmissionVersions(data){
    const response = await fetchData('api/submission/getAllSubmissionVersions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data)
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