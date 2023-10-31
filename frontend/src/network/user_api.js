export function fetchData(path, header){
    const response = fetch(`localhost:4343/${path}`, header);
    if(response){
        return response;
    }else{
        throw new("Something went wrong");
    }
}

export function getLoggedInUser(data){
    const response = fetchData("user/api/login", {
        method: "POST",
        heades:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json;
}