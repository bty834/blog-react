import request from "../utils/request";

export function  usernamePasswordLogin({username,password,uuid,captcha}){
    return request(
        {
            url:'/login',
            method: 'post',
            data:{username,password,uuid,captcha}
        }
    )

}
