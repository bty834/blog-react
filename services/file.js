import request from "../utils/request";
import {getToken} from "../utils/auth";

export function  uploadRecord(formData){
    return request(
        {
            url:'/file/record',
            method: 'post',
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        }
    )
}
export function  uploadPostImage(formData){
    return request(
        {
            url:'/file/postImage',
            method: 'post',
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        }
    )

}