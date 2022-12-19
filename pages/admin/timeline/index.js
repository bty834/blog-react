import React, {useEffect, useRef, useState} from 'react';
import useLogin from "../../../utils/useLogin";
import Head from "next/head";
import {createTimeline, deleteTimeline, queryTimelineList, updateTimeline} from "../../../services/timeline";
import {toast, ToastContainer} from "react-toastify";

const AdminTimeline = () => {

    const [timelineList, setTimelineList] = useState([]);
    const [curTimelineId, setCurTimelineId] = useState(0);
    const inputError = () => toast.error("输入错误，请重新输入");
    const editSuccess = () => toast.success("修改成功")
    const editFail = (msg) => toast.error("修改失败"+msg)

    const phaseEl = useRef();
    const titleEl = useRef();
    const linkEl = useRef();
    const subTitleEl = useRef();
    const contentEl = useRef();
    const startEl = useRef();
    const endEl = useRef();


    const login = useLogin()

    useEffect(() => {
        async function init() {
            const result = await queryTimelineList()
            setTimelineList(result.data)
        }

        init()
    }, []);


    const editTimeline = (timeline) => {
        setCurTimelineId(timeline.id)
        phaseEl.current.value = timeline.phase
        titleEl.current.value = timeline.title
        linkEl.current.value = timeline.link
        subTitleEl.current.value = timeline.subTitle
        contentEl.current.value = timeline.content
        startEl.current.value = timeline.start
        endEl.current.value = timeline.end
    }
    const clearTimeline = () => {
        setCurTimelineId(0)
        phaseEl.current.value = null
        titleEl.current.value = null
        linkEl.current.value = null
        subTitleEl.current.value = null
        contentEl.current.value = null
        startEl.current.value = null
        endEl.current.value = null
    }

    const submitTimeline = () => {
        if (!phaseEl.current.value || phaseEl.current.value.trim() === "" ||
            !titleEl.current.value || titleEl.current.value.trim() === "" ||
            !linkEl.current.value || linkEl.current.value.trim() === "" ||
            !subTitleEl.current.value || subTitleEl.current.value.trim() === "" ||
            !contentEl.current.value || contentEl.current.value.trim() === "" ||
            !startEl.current.value || startEl.current.value.trim() === "" ||
            !endEl.current.value || endEl.current.value.trim() === ""
        ) {
            inputError()
            return;
        }

        const yes = confirm("确定提交？")
        if (!yes) {
            return;
        }

        if (curTimelineId === 0) {
            const submitData = {
                phase: phaseEl.current.value,
                title: titleEl.current.value,
                link: linkEl.current.value,
                subTitle: subTitleEl.current.value,
                content: contentEl.current.value,
                start: startEl.current.value,
                end: endEl.current.value,
            }

            createTimeline(submitData).then(r => {
                if (r?.code === 200) {
                    editSuccess()
                } else{
                    editFail(r?.msg)
                }
            })
        } else {
            const submitData = {
                id: curTimelineId,
                phase: phaseEl.current.value,
                title: titleEl.current.value,
                link: linkEl.current.value,
                subTitle: subTitleEl.current.value,
                content: contentEl.current.value,
                start: startEl.current.value,
                end: endEl.current.value,
            }
            updateTimeline(submitData).then(r => {
                if (r?.code === 200) {
                    editSuccess()
                } else{
                    editFail(r?.msg)
                }
            })
        }
    }

    const removeTimeline = (id) => {
        const yes = confirm("确定删除？")
        if (!yes) {
            return;
        }
        deleteTimeline(id).then(r => {
            if (r?.code === 200) {
                editSuccess()
            } else{
                editFail(r?.msg)
            }
        })
    }

    return (
        <div>
            <Head>
                <title>博客Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            {login && (

                <div className={"m-4 p-2 grid md:grid-cols-12 grid-cols-1 gap-8"}>

                    <div className={"md:col-span-4 col-span-1 panel-bg h1-color p-2 rounded-md"}>
                        {timelineList?.length > 0 && timelineList.map(timeline => (
                            <div className={"flex justify-between my-2"}>
                                <div

                                    key={timeline.id}
                                    className={"sub-panel-bg text-center p-2 rounded-lg"}>
                                    {timeline.title}

                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            editTimeline(timeline)
                                        }}
                                        className={"bg-green-500 p-2 rounded-lg "}>
                                        edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            removeTimeline(timeline.id)
                                        }}
                                        className={"ml-2 bg-red-600 p-2 rounded-lg "}>
                                        delete
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>


                    <div className={"md:col-span-8 col-span-1 "}>
                        <ToastContainer
                            position="top-center"
                            autoClose={700}
                            hideProgressBar
                            closeOnClick
                            rtl={false}
                            newestOnTop={false}
                            limit={3}
                            theme="colored"
                        />
                        <div className={"flex-col h1-color justify-center items-center"}>
                            <div >
                                阶段选择：
                            </div>
                            <select ref={phaseEl} id={"phase"} className={"panel-bg md:w-1/4 w-full p-1 mb-2"}>
                                <option value={"university"}>
                                    学生阶段
                                </option>
                                <option value={"graduated"}>
                                    毕业后
                                </option>
                            </select>

                            <div className={"h1-color"}>
                                标题：
                            </div>
                            <input
                                ref={titleEl} id={"title"}
                                className={"panel-bg md:w-1/3 w-full p-1 rounded-md mb-2"}
                                placeholder={"请输入标题"}
                                type={"text"}

                            />


                            <div className={"h1-color"}>
                                链接：
                            </div>

                            <input
                                ref={linkEl} id={"link"}
                                className={"panel-bg w-full p-1 rounded-md mb-2"}
                                placeholder={"请输入链接"}
                                type={"text"}

                            />


                            <div className={"h1-color"}>
                                副标题：
                            </div>
                            <textarea
                                ref={subTitleEl} id={"subTitle"}
                                className={"panel-bg w-full p-1 rounded-md mb-2"}
                                placeholder={"请输入副标题"}

                            />

                            <div className={"h1-color"}>
                                内容：
                            </div>
                            <textarea
                                ref={contentEl} id={"content"}
                                className={"panel-bg w-full p-1 h-32 rounded-md mb-2"}
                                placeholder={"请输入内容"}

                            />

                            <div className={"h1-color"}>
                                起始时间：
                            </div>
                            <div>
                                <input
                                    ref={startEl} id={"start"}
                                    className={"panel-bg w-1/3 p-1 mr-4 rounded-md"}
                                    placeholder={"开始时间"}
                                    type={"text"}
                                />
                                <input
                                    ref={endEl} id={"end"}
                                    className={"panel-bg  w-1/3 p-1 rounded-md"}
                                    placeholder={"结束时间"}
                                    type={"text"}
                                />
                            </div>

                        </div>
                        <div className={"text-right"}>
                            <button className={"bg-red-600 p-2 rounded-lg h1-color mr-4"} onClick={clearTimeline}>
                                清除
                            </button>
                            <button className={"bg-green-500 p-2 rounded-lg h1-color"} onClick={submitTimeline}>
                                提交
                            </button>
                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminTimeline;
