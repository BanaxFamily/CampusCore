import { fetchData } from "./user_api";

export async function createCourseDeliverable(data){
    const response = await fetchData('api/course-deliverable/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return response;
}

export async function getCourseDeliverable(data){
    const response = await fetchData('api/course-deliverable/getByCourse', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}

export async function deleteCourseDeliverable(data){
    const response = await fetchData('api/course-deliverable/delete', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}