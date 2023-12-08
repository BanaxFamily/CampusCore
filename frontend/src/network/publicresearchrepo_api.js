import { fetchData } from "./user_api";

export async function addRequestUpload(data) {
  const response = await fetchData("api/repository/requestUpload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function getOnePublished(data) {
  const response = await fetchData("api/repository/getById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
export async function getAllRequest() {
  const response = await fetchData("api/repository/getAllRequest", {
    method: "GET",
  });
  return response;
}
export async function getAllCertifications(data) {
  const response = await fetchData("api/repository/viewApprovalCertificate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
export async function approvedResearchFinal(data) {
  const response = await fetchData("api/repository/approveResearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
export async function getAllPublishedResearch() {
  const response = await fetchData("api/repository/getAllPublished", {method: "GET"});
  return response;
}
