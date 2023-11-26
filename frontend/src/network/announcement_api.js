import { fetchData } from "./user_api";

export async function getAnnouncement() {
  const response = await fetchData("api/announcement/viewList", {
    method: "GET",
  });
  return response;
}

export async function addAnnouncement(data){
  const response = await fetchData("api/announcement/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response;
}
export async function getAnnouncementByFaculty(data){
  const response = await fetchData("api/announcement/getById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response;
}
