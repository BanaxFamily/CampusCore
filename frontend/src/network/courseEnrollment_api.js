/* eslint-disable no-unused-vars */
import { fetchData } from "./user_api";

export async function getEnrolledStudent(data) {
  const response = await fetchData("api/course-enrollment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function getEnrolledCourses(data) {
  const response = await fetchData("api/course-enrollment/courseEnrolled", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}
