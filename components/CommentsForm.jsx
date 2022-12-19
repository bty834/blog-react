import React, {useEffect, useRef, useState} from 'react';
import comments from "./Comments";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {insertComment} from "../services/post";


const CommentsForm = ({postId}) => {


    const inputError = () => toast.error("输入错误，请重新输入");
    const commentSuccess = () => toast.success("评论成功")
    const commentFail = () => toast.error("评论失败")

    const localStoredNameKey = "btyBlogCommentName"
    const localStoredEmailKey = "btyBlogCommentEmail"


    const nameEl = useRef();
    const emailEl = useRef();
    const commentEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem(localStoredNameKey)
        emailEl.current.value = window.localStorage.getItem(localStoredEmailKey)
    }, []);


    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/


    const handleSubmitComments = () => {
        const {value: content} = commentEl.current
        const {value: name} = nameEl.current
        const {value: email} = emailEl.current
        const {checked: storeData} = storeDataEl.current


        if (!content || content.trim() === "" || !name || name.trim() === "" || !emailReg.test(email)) {
            inputError()
            return;
        }


        if (storeData) {
            // setLocalStorage({name,email})
            window.localStorage.setItem(localStoredNameKey, name)
            window.localStorage.setItem(localStoredEmailKey, email)
        } else {
            window.localStorage.removeItem(localStoredEmailKey)
            window.localStorage.removeItem(localStoredNameKey)
        }


        const commentObj = {
            name, email, content, postId
        }

        //todo submit comments
        insertComment(commentObj).then(r => {
            if (r.code === 200) {
                commentSuccess()
            } else {
                commentFail()
            }
        })

    }


    return (
        <div className="panel-bg shadow-lg rounded-lg p-8 pb-5 mb-4">

            <div className="grid grid-cols-1 gap-4 mb-4">
                <span className="text-red-700 absolute">
                    *
                </span>
                <textarea
                    className="sub-panel-bg h1-color p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 "
                    placeholder="评论一下"
                    id="comment"
                    name="comment"
                    ref={commentEl}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

                <div className="col-span-1 lg:col-span-1">
                     <span className="text-red-700 absolute">
                    *
                    </span>
                    <input
                        type="text"
                        ref={nameEl}
                        className="sub-panel-bg h1-color py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200"
                        placeholder="署名"
                        id="name"
                        name="name"
                    />
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <span className="text-red-700 absolute">
                    *
                    </span>
                    <input
                        type="text"
                        ref={emailEl}
                        className="sub-panel-bg h1-color py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 "
                        placeholder="邮箱"
                        name="email"
                        id="email"

                    />
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">

                <div className="col-span-1 lg:col-span-4">
                    <input type="checkbox" id="storeData" ref={storeDataEl} name="storeData" defaultChecked="true"/>
                    <label className="ml-1 text-sm h2-color cursor-pointer"
                           htmlFor="storeData"
                    >保存署名和邮箱供下次使用<
                    /label>
                </div>
                <div className="col-span-1">
                    <button
                        className="button-comment"
                        onClick={handleSubmitComments}
                    >
                        发表评论
                    </button>

                </div>
            </div>
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
    );
};

export default CommentsForm;
