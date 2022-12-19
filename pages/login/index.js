import React, {useEffect, useRef, useState} from 'react';

import {useRouter} from 'next/router'
import {toast, ToastContainer} from "react-toastify";
import {usernamePasswordLogin} from "../../services/login";
import {setToken} from "../../utils/auth";
import useLogin from "../../utils/useLogin";
import {getCaptcha} from "../../services/captcha";


const Login = () => {

    const [captchaEnabled, setCaptchaEnabled] = useState(true);
    const [captcha, setCaptcha] = useState({});

    const usernameEl = useRef();
    const passwordEl = useRef();
    const captchaEl = useRef();

    const login = useLogin()

    const router = useRouter()

    useEffect(() => {
        if (login) {
            router.push("/admin")
        }
    }, [login]);

    useEffect(() => {
        refreshCaptcha()
    }, []);

    const refreshCaptcha = async () => {
        const captchaResult = await getCaptcha()
        // console.log(captchaResult)
        setCaptchaEnabled(captchaResult.data?.enabled)
        setCaptcha(captchaResult.data)
    }


    const loginErrorTip = (error) => toast.error("登录失败:" + error)
    const inputErrorTip = () => toast.error("输入有误，请重新输入")
    const errorTip = (errorInfo) => toast.error(errorInfo)

    const startLogin = () => {
        const {value: username} = usernameEl.current
        const {value: password} = passwordEl.current


        if (!username ||
            username.trim() === "" ||
            !password ||
            password.trim() === ""
        ) {
            inputErrorTip()
            return;
        }
        // Base64 encode
        const encodedPassword = btoa(password)

        let uuid
        let captchaText

        if (captchaEnabled) {
            if (!captchaEl.current.value ||
                captchaEl.current.value.trim() === "") {
                inputErrorTip()
                return;
            }

            uuid = captcha.uuid
            captchaText = captchaEl.current.value

        }

        usernamePasswordLogin({username, password: encodedPassword, uuid, captcha: captchaText}).then(
            result => {
                if (result.code !== 200) {
                    errorTip(result.msg)
                    refreshCaptcha()
                    return;
                }
                setToken(result.data.token)
                router.reload()

            }
        )
    }


    return (

        <div className="my-40">
                <div className="lg:w-1/4 md:w-1/3 w-1/2 my-4 mx-auto">
                    <input
                        className="sub-panel-bg w-full h1-color py-2 px-4 outline-none h-10  rounded-lg "
                        placeholder="用户名"
                        ref={usernameEl}
                       id={"username"}
                        type="text"
                    />
                </div>

                <div className="lg:w-1/4 md:w-1/3 w-1/2 my-4 mx-auto">

                    <input
                        className="sub-panel-bg h1-color py-2 px-4 w-full outline-none h-10  rounded-lg  "
                        placeholder="密码"
                        id={"password"}
                        ref={passwordEl}
                        type="password"
                    />
                </div>

                    {captchaEnabled && (
                        <div className="flex text-center lg:w-1/4 md:w-1/3 w-1/2 items-center mx-auto my-4">

                            <img
                                className={"h-10 mr-2"}
                                src={`data:image/jpg;base64,${captcha?.base64Image}`}
                                alt={"captcha"}
                                onClick={refreshCaptcha}
                            />
                            <input
                                style={{width: '100%'}}
                                className="sub-panel-bg h1-color py-2 px-4 outline-none h-10  rounded-lg  "
                                placeholder="验证码"
                                id={"captcha"}
                                ref={captchaEl}
                                type="text"
                            />


                        </div>
                    )}


            <div className="my-4  lg:w-1/4 md:w-1/3 w-1/2 mx-auto ">
                    <button
                        type="button"
                        className="h-10 w-full search-btn rounded-lg"
                        onClick={startLogin}
                    >
                        登录
                    </button>
                </div>


                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    pauseOnHover
                    closeOnClick
                    rtl={false}
                    newestOnTop={false}
                    limit={3}
                    theme="colored"
                />


        </div>


    );
};

export default Login;
