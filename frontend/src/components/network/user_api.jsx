// const apiUrl = "https://localhost:44313"

export async function fetchData(input, init){
    const response = await fetch(input, init);
    return response

    // if(response.isSuccess === true){
    //     return response;
    // }else{
    //     const errorBody = await response.json();
    //     const errorMessage = errorBody.errors;

    //     throw new Error(errorMessage);
    // }
}

// GET ALL USERS but it is not implement in the backend yet
// export async function getLoggedInUser(){
//     const response = await fetchData("/api/auth/login")
// }

export async function signIn({username, password}){
    const response = await fetchData("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });

    return response.json();
}