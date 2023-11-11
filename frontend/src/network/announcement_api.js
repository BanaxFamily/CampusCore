import { fetchData } from "./user_api";

export async function getAnnouncement() {
  const response = await fetchData("api/announcement/viewList", {
    method: "GET",
  });
  return response;
}
