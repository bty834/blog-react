import React from 'react';
import moment from "moment";
import Link from "next/link";
import {CalendarLogo, ViewLogo} from "./logo/Logo";
import Markdown from "./Markdown";
import useLogin from "../utils/useLogin";
import {removePostById} from "../services/post";
import {toast, ToastContainer} from "react-toastify";
import {useRouter} from "next/router";


const PostDetail = ({postDetail, curTags}) => {





    const login = useLogin()
    const router = useRouter()
    const successTip = (msg) => toast.success(msg)
    const errorTip = (msg) => toast.error("失败：" + msg)
    const cancelPost = (id) => {
        const yes = confirm("确定删除？")
        if (!yes) {
            return
        }
        removePostById(id).then(r => {
            if (r.code === 200) {
                router.push("/post")
            } else {
                errorTip(r.msg)
            }
        })
    }
    const goEdit = (postDetail) => {

        router.push({
            pathname: '/admin/post', query: {
                id: postDetail.id,
            }
        })
    }

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div className="panel-bg flex-col items-center justify-center shadow-lg rounded-lg lg:pt-8 pt-2 mb-4">
            <h1 className="h1-color px-2 text-center text-3xl font-bold mb-5">
                {postDetail?.title}
            </h1>
            <div className="relative flex items-center justify-center ">
                <CalendarLogo/>
                <span className="h2-color mr-4">
                    {moment(postDetail?.created).format('YYYY-MM-DD')}
                </span>

                {
                    (curTags && curTags.length>0) && curTags.map((tag) => (
                        <span key={tag?.id} className="h2-color">
                                #{tag?.name}
                        </span>
                    ))
                }
                {/*<ViewLogo/>*/}

                {login && (
                    <span className={"absolute right-2"}>
                        <button
                            onClick={() => goEdit(postDetail)}
                            className={"bg-green-500 p-1 rounded-lg hover:scale-105 transition"}
                        >
                            编辑
                        </button>
                        <button
                            className={"bg-red-600 p-1 rounded-lg ml-2 hover:scale-105 transition"}
                            onClick={() => {
                                cancelPost(postDetail?.id)
                            }}
                        >
                            删除
                        </button>
                    </span>


                )}
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    pauseOnHover
                    hideProgressBar
                    closeOnClick
                    rtl={false}
                    newestOnTop={false}
                    limit={3}
                    theme="colored"
                />
            </div>
            <div className="h1-color lg:p-4 p-2">
                <Markdown content={postDetail?.content}/>
            </div>


        </div>
    );
};

export default PostDetail;
