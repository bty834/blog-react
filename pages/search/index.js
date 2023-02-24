import React, {useRef} from 'react';
import Head from "next/head";
import Lottie from "lottie-react";
import searchJson from "../../public/lottie/search.json";
import {MagnifierLogo} from "../../components/logo/Logo";


const Search = () => {

    const searchBarEl = useRef();

    const doSearch = () => {
        console.log("doSearch")
    }

    return (
        <div className="container mx-auto flex-col justify-center items-center px-7 mb-8">
            <Head>
                <title>404</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="flex justify-center  items-center">
                <input
                    type="text"
                    ref={searchBarEl}
                    style={{borderRadius: `16px 0 0 16px`}}
                    className="panel-bg h-10 p-2 outline-none shadow-lg md:w-1/3 w-2/3 "
                    placeholder="请输入内容查询"
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            doSearch()
                        }
                    }}
                    id="name"
                    name="name"
                />
                <button
                    onClick={doSearch}
                    style={{borderRadius: `0 16px 16px 0`}}
                    className="search-btn bg-pink-500 h-10 p-2 shadow-lg flex items-center justify-center">
                    <i>
                        <MagnifierLogo />
                    </i>
                    <span className="h1-color">
                            搜索
                        </span>
                </button>

            </div>


            <Lottie style={{zIndex: -1}} className="h-80"
                    animationData={searchJson} loop={true}/>
        </div>
    );
};

export default Search;
