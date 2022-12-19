import request from "../utils/request";

export function  getCaptcha(){

    // enabled uuid base64Image created
    return request(
        {
            url:'/captcha',
            method: 'get',
        }
    )
}



