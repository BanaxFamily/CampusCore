import { fetchData } from "./user_api";

export async function addAnnouncementComment(data){
    const response = await fetchData("api/announcementComment/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response;
}
export async function viewAnnouncementComments(data){
    const response = await fetchData("api/announcementComment/viewComments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response;
}