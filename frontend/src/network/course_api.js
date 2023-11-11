import { fetchData } from "./user_api";

export async function viewCourse() {
  const respone = await fetchData("api/course/viewList", {
    method: "GET",
  });
  return respone;
}

export async function addCourse(data) {
  const response = await fetchData("api/course/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function updateCourse(data) {
  const response = await fetchData("api/course/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteCourse(id) {
  const response = await fetchData("api/course/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return response;
}

export async function searchCourse(key) {
  const response = await fetchData("api/course/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(key),
  });

  return response;
}
