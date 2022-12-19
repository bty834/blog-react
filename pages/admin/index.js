import React, {useEffect, useRef, useState} from 'react';
import Head from "next/head";
import {getToken} from "../../utils/auth";
import useLogin from "../../utils/useLogin";


const data = [
    {
        name: "时间线编辑",
        url: "/admin/timeline"
    },
    {
        name: "博文编辑",
        url: "/admin/post"
    },
    {
        name: "记录编辑",
        url: "/admin/record"
    }
]

const AdminBoard = () => {

    const login = useLogin()


    return (
        <div className="container mx-auto px-7 mb-8">
            <Head>
                <title>博客Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {
                login && (
                    <div>
                        {data?.length > 0 && data.map(d => (
                            <a key={d.name} href={d.url} className="panel-bg h1-color m-2 p-2 rounded-lg">
                                {d.name}
                            </a>
                        ))}
                    </div>
                )
            }



        </div>
    );
};

export default AdminBoard;
