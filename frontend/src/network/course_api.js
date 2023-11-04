import { fetchData } from "./user_api";

export async function getCourse() {
  const respone = await fetchData("api/course/viewList", { method: "GET" });
  return respone;
}
