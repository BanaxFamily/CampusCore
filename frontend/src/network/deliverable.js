import { fetchData } from "./user_api";

export async function addDeliverable(data){
    const response = await fetchData('api/deliverable/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function getOneDeliverable(data){
    const response = await fetchData('api/deliverable/getById', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function updateDeliverable(data){
    const response = await fetchData('api/deliverable/update', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

export async function deleteDeliverable(data){
    const response = await fetchData('api/deliverable/delete', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response;
}

