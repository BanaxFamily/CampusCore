import { fetchData } from "./user_api";

export async function createGroup(data){
    const response = await fetchData("api/group/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response
}

export async function getAllGroupsByCourse(data){
    const response = await fetchData("api/group/getAllByCourse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function getNoGroupStudents(data){
    const response = await fetchData("api/group/getNoGroupStudents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function getAllStudentsFromUpdateApi(data){
    const response = await fetchData("api/group/getStudentsForUpdate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function viewGroupMembers(data){
    const response = await fetchData("api/group/getMembers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}
export async function updateMembers(data){
    const response = await fetchData("api/group/updateMembers", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}