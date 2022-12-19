import React, {useContext, useState} from 'react';
import Link from "next/link"
import Lottie from "lottie-react";
import rocketJson from "../public/lottie/rocket.json"
import darkRocketJson from "../public/lottie/darkRocket.json"
import Switch from "react-switch";
import {ThemeContext} from "./context/ThemeContext";
import DarkModeIcon from "./logo/DarkModeLogo";
import LightModeIcon from "./logo/LightModeLogo";

import useLogin from "../utils/useLogin";
import {removeToken} from "../utils/auth";
import {useRouter} from "next/router";


const title = "T.Y.Bao"

const Navbar = () => {
    const router = useRouter();

    const themeContext = useContext(ThemeContext);

    const logout = () => {
        removeToken()
        router.reload()
    }


    const [searchTerm, setSearchTerm] = useState('');

    const login = useLogin()

    const searchUpdated = (term) => {
        setSearchTerm(term)
    }

    const changeTheme = () => {
        themeContext.toggleTheme()
    }

    return (
        <div className="container h1-color mx-auto px-5 mb-4">

            <div className=" border-b  w-full grid lg:grid-cols-12 grid-cols-1 inline-block   py-2">

                <div className="lg:col-span-6 col-span-1 flex items-center justify-center lg:justify-start">
                    {/*<Lottie style={{zIndex: -1}} className="absolute top-0 left-0 h-20"*/}
                    {/*        animationData={themeContext.theme === "light" ? rocketJson : darkRocketJson} loop={true}/>*/}

                    <Link href="/">

                        <span
                            className="cursor-pointer lg:ml-10  rounded-lg  text-4xl">
                                {title}
                        </span>

                    </Link>
                </div>

                <div
                    className="lg:col-start-8 my-2 lg:col-span-5 col-span-1 flex items-center justify-center lg:justify-end"
                >

                    {/*<Link*/}
                    {/*    href="/search"*/}
                    {/*    title="搜索"*/}
                    {/*>*/}
                    {/*    <SearchLogo />*/}
                    {/*</Link>*/}
                    <Link
                        href={"/"}
                    >
                            <span
                                className=" mx-1 p-1  text-sm lg:text-lg rounded-lg">
                                首页
                            </span>
                    </Link>

                    <Link

                        href={"/post"}
                    >
                            <span
                                className=" mx-1 p-1  text-sm lg:text-lg rounded-lg">
                               博文
                            </span>
                    </Link>
                    <Link

                        href={"/record"}
                    >
                            <span
                                className=" mx-1 p-1  text-sm lg:text-lg rounded-lg">
                                  记录
                            </span>
                    </Link>

                    <Link

                        href={"/about"}
                    >
                            <span
                                className=" mx-1 p-1  text-sm lg:text-lg rounded-lg">
                                关于
                            </span>
                    </Link>
                    {
                        login && (
                            <Link

                                href={"/admin"}
                            >
                            <span
                                className=" mx-1 p-1  text-sm lg:text-lg rounded-lg">
                                管理
                            </span>
                            </Link>
                        )
                    }
                    {
                        login && (
                            <span
                                onClick={logout}
                                className=" mx-1 p-1 cursor-pointer text-sm lg:text-lg rounded-lg"
                            >
                               退出
                            </span>
                        )
                    }
                    {/*<span*/}
                    {/*    className=" mx-1 p-1  text-sm lg:text-lg rounded-lg"*/}

                    {/*>*/}
                    {/*    <LocaleSwitch/>*/}

                    {/*</span>*/}
                    <Switch
                        checked={themeContext.theme === "light"}
                        onChange={changeTheme}
                        uncheckedIcon={<div/>}
                        checkedIcon={<div/>}
                        uncheckedHandleIcon={<DarkModeIcon/>}
                        checkedHandleIcon={<LightModeIcon/>}
                        onColor='#e5e5e5'
                        offColor="#2f2f2f"
                        onHandleColor="#ffffff"
                        offHandleColor="#1a1a1a"
                        borderRadius={16}
                    />
                </div>
            </div>

        </div>
    );
};

export default Navbar;

