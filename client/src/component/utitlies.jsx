
export const saveToken = (token)=>{
    localStorage.setItem('token',JSON.stringify(token));
}

export const getToken=()=>{
    return JSON.parse(localStorage.getItem('token'));
}

export const logOut = ()=>{
    localStorage.removeItem('token');
}

export const getCurrUser = ()=>{

}