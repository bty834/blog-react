import Head from 'next/head'
import {PostWidget, PostCard, TagsPanel} from "../../components";
import {
    queryPostList,
    queryPostListByTagId,
    queryRecentPostList,
    queryTagList,
    searchPostByTerm
} from "../../services/post";
import React, {useEffect, useRef, useState} from "react";

import OrderSelect from "../../components/OrderSelect";
import Pagination from "../../components/Pagination";
import {MagnifierLogo} from "../../components/logo/Logo";
import {toast, ToastContainer} from "react-toastify";

import Link from "next/link";

const postsPerPage = 10

export default function Post() {
    let timer;
    const searchEl = useRef();
    const [selectedOrder, setSelectedOrder] = useState("0");
    const [selectedTagId, setSelectedTagId] = useState(0);

    const [searchPosts, setSearchPosts] = useState([]);
    const error = (msg) => toast.error("失败：" + msg)

    const [posts, setPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [tags, setTags] = useState([]);

    const [pageCount, setPageCount] = useState(0);

    const fetchPosts = async (pageNum) => {
        let postResult
        if (selectedTagId == 0) {
            postResult = await queryPostList(pageNum, postsPerPage, selectedOrder)
        } else {
            postResult = await queryPostListByTagId(selectedTagId, pageNum, postsPerPage, selectedOrder)
        }
        setPageCount(Math.ceil(postResult?.total / postsPerPage))
        setPosts(postResult.data)
    }

    const initStates = async () => {
        const [recentPostResult, tagsResult] = await Promise.all([
            queryRecentPostList(),
            queryTagList()
        ])
        setRecentPosts(recentPostResult.data)
        // console.log(tagsResult)
        setTags(tagsResult.data)
    }
    const inputError = () => toast.error("输入错误，请重新输入");

    useEffect(() => {
        fetchPosts(1)
    }, [selectedOrder, selectedTagId]);

    useEffect(() => {
        initStates()
    }, []);

    const doSearch = () => {
        if (timer) {
            clearTimeout(timer)
        }
        const searchTerm = searchEl.current.value
        if (!searchTerm || searchTerm.trim() === "") {
            return
        }
        timer = setTimeout(() => {
            fetchSearchResult(searchTerm)
        }, 600)


    }
    const fetchSearchResult = async (searchTerm) => {
        searchPostByTerm(searchTerm).then(r=>{
            if(r.code===200){
                setSearchPosts(r.data)
            } else{
                error(r.msg)
            }
        })


        // console.log(searchResult)

    }
    const clearSearchResult = ()=>{
        setTimeout(
            ()=>{
                setSearchPosts([])
            },500
        )
    }

    const handlePageClick = (event) => {
        fetchPosts(event.selected + 1)
    };

    return (
        <div className="container mx-auto px-7 mb-8">
            <Head>
                <title>Bao的博客</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <div className=" grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8 col-span-1">
                    <div
                        className={"relative h1-color mb-4 flex items-center"}
                        onBlur={clearSearchResult}
                    >
                        <span className="flex justify-center  items-center ">
                                 <button
                                     onClick={doSearch}
                                     // onBlur={clearSearchResult}
                                     className="search-btn rounded-l-md h-6 p-1 flex items-center justify-center"
                                 >
                                <i>
                                    <MagnifierLogo/>
                                </i>

                            </button>
                            <input
                                type="text"
                                ref={searchEl}
                                className="panel-bg rounded-r-md h-6 p-1 outline-none shadow-lg  "
                                placeholder="请输入标题查询"
                                onKeyUp={doSearch}
                                // onBlur={clearSearchResult}
                                id="name"
                                name="name"
                            />

                        </span>
                        {searchPosts?.length > 0 && (
                            <span className={"absolute top-7 rounded-sm shadow-lg p-1 sub-panel-bg"}>
                        {
                            searchPosts?.map((post) => (
                                <Link key={post.id} href={`/post/detail/${post.id}`}>
                                    <div className={"h-6 hover:text-pink-500 border-b border-b-gray-500"}>
                                        {post.title}
                                    </div>
                                </Link>
                            ))
                        }
                    </span>
                        )}

                        <OrderSelect
                            selectedOrder={selectedOrder}
                            setSelectedOrder={setSelectedOrder}
                        />

                    </div>

                    {
                        posts?.map((post, index) => (
                            <PostCard key={index} post={post}/>
                        ))
                    }
                    {
                        pageCount > 1 && (
                            <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
                        )
                    }
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget recentPosts={recentPosts}/>
                        <TagsPanel tags={tags} selectedTagId={selectedTagId} setSelectedTagId={setSelectedTagId}/>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1200}
                hideProgressBar
                closeOnClick
                pauseOnHover={true}
                rtl={false}
                newestOnTop={false}
                limit={3}
                theme="colored"
            />
        </div>
    )
}

