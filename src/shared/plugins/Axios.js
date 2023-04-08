import axios from "axios";

export const URLSERVIS = axios.create({
    baseURL : "http://localhost:8080/api/"
});

const login = (email, password) => {
    return URLSERVIS("users/",{
        email,
        password,
    }).then((res) => {
        if(res.data.data.email) {
            localStorage.setItem("email",JSON.stringify(res.data));
        }
        return res.data;
    });
};


const AuthService = {
    login,
};

export {
    AuthService
};




