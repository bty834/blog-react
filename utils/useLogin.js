import {useEffect, useRef, useState} from "react";
import {getToken, removeToken} from "./auth";



export default function useLogin() {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        if (getToken()) {
            setLogin(true)
        }

    }, []);

    return login
}
