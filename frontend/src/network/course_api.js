import { fetchData } from "./user_api";

export async function viewOfferedCourse() {
  const respone = await fetchData("api/offered-course/viewList", {
    method: "GET",
  });
  return respone;
}

export async function addOfferedCourse(data) {
  const response = await fetchData("api/offered-course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteOfferedCourse(id) {
  const respone = await fetchData("api/offered-course/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return respone;
}
