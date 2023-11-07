import { fetchData } from "./user_api";

export async function viewCourse() {
  const respone = await fetchData("api/offered-course/viewList", {
    method: "GET",
  });
  return respone;
}

export async function addCourse(data) {
  const response = await fetchData("api/offered-course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}


export async function deleteCourse(id) {
  const respone = await fetchData("api/offered-course/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return respone;
}
