import { fetchData } from "./user_api";

export async function getAllAnnouncement() {
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
export async function getAnnouncementByCourse(data){
  const response = await fetchData("api/announcement/getByOfferedCourse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response;
}
export async function getSpecificCourse(data){
  const response = await fetchData("api/announcement/getById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response;
}
export async function getAnnouncementByStudent(data){
  const response = await fetchData("api/announcement/getByUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return response;
}
