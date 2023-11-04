export async function fetchData(path, header) {
  const response = await fetch(`https://localhost:44313/${path}`, header);
  return response;
}

export async function signIn(data) {
  const response = await fetchData("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}


