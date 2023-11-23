export async function fetchData(path, header) {
  const response = await fetch(`https://localhost:44313/${path}`, header);
  if (response.status === 200) {
    return response.json();
  }
  return response
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

export async function addUser(data) {
  const respone = await fetchData("api/auth/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return respone;
}

export async function updateUser(data) {
  const response = await fetchData("api/auth/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function viewUser(searchKey) {
  const response = await fetchData("api/auth/viewList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchKey),
  });
  return response;
}

export async function deleteUser(id) {
  const response = await fetchData("api/auth/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  return response;
}

export async function searchUser(key) {
  const response = await fetchData("api/auth/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(key),
  });

  return response;
}
