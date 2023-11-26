import { fetchData } from "./user_api";

export async function getFacultyOfferedCourseDeliverables(data){
    const response = await fetchData('api/offeredCourseDeliverable/getByOfferedCourse', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}
export async function setDeadlineOfferedCourseDeliverable(data){
    const response = await fetchData('api/offeredCourseDeliverable/update', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response
}