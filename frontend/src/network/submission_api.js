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
export async function addApproval(data){
    const response = await fetchData('api/submission/approve', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data)
    })
    return response
}
export async function getBySubmissionId(data){
    const response = await fetchData('api/submission/getById', {
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
export async function addNewSubmissionDeliverableVersion(data){
    const response = await fetchData('api/submission/addNewVersion', {
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
export async function getAllSubmissionFaculty(data){
    const response = await fetchData('api/submission/getAllSubmissionsForFaculty', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data)
    })
    return response
}
export async function getAllSubmissionDean(data){
    const response = await fetchData('api/submission/getAllSubmissionsForDean', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(data)
    })
    return response
}
export async function getAllSubmissionPrc(data){
    const response = await fetchData('api/submission/getAllSubmissionsForPRC', {
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
export async function getLatestVerionOfFile(data){
    const response = await fetchData('api/submission/getLatestVersion', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}
export async function advisoryApproval(data){
    const response = await fetchData('api/submission/adviserApprove', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}


export async function getFacultyAllDeliverableByOfferedDeliverable(data){
    const response = await fetchData('api/submission/getAllByOfferedCourseDeliverable', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}