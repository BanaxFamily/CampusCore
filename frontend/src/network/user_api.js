export function getLoggedInUser(){
    const response = fetch("localhost:4343/user/api/get")
    return response.json
}