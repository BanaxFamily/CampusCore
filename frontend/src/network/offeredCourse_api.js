import {fetchData} from "./user_api"


export async function addOfferCourse(data){
    const response = await fetchData("api/offered-course/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    return response
}


export async function viewAllOfferedCourse() {
    const response = await fetchData("api/offered-course/viewList", { method: "GET" })
    return response
}