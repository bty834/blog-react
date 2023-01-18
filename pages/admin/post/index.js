import Head from "next/head";
import React, {useEffect, useRef, useState} from "react";

import useLogin from "../../../utils/useLogin";
import {toast, ToastContainer} from "react-toastify";
import {
    createTag,
    deleteTag, insertPost,
    modifyTag, queryPostDetailByPostId,
    queryTagList,
    updatePost
} from "../../../services/post";
import Multiselect from "multiselect-react-dropdown";
import {uploadPostImage} from "../../../services/file";
import {useRouter} from "next/router";



const PostEditor = () => {
    const login = useLogin()
    const router = useRouter()

    const [tagList, setTagList] = useState([]);
    const [selectedTagIdList, setSelectedTagIdList] = useState([]);
    const [coverUrl, setCoverUrl] = useState("");

    const [preDefPostDetail, setPreDefPostDetail] = useState({});

    const inputError = () => toast.error("输入错误，请重新输入");
    const uploadError = (msg) => toast.error("失败：" + msg)

    const successTip = (msg) => toast.success(msg)

    const titleEl = useRef();
    const coverEl = useRef();
    const imageEl = useRef();
    const abstractEl = useRef();
    const contentEl = useRef();
    const selectedTagListEl = useRef();
    const newTagEl = useRef();


    useEffect(() => {
        if(router.query && Object.keys(router.query).length>0){
            const postId = router.query?.id
            queryPostDetailByPostId(postId).then(r => {
                if(r.code===200){
                    setPreDefPostDetail(r.data)
                    setCoverUrl(r.data?.coverUrl)
                } else{
                    uploadError(r.msg)
                }
            })
        }
    }, []);


    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const result = await queryTagList()
        setTagList(result.data);
    }
    const selectTag = (selectedList, selectedItem) => {
        setSelectedTagIdList([...selectedTagIdList, selectedItem.id])
    }

    const removeSelectedTag = (selectedList, selectedItem) => {
        const newTagIdList = selectedTagIdList.filter(tagId => {
            return tagId !== selectedItem.id
        })
        setSelectedTagIdList(newTagIdList)

    }

    const submitPost = () => {
        if (
            !titleEl.current.value ||
            titleEl.current.value.trim() === "" ||
            !abstractEl.current.value ||
            abstractEl.current.value.trim() === "" ||
            !contentEl.current.value ||
            contentEl.current.value.trim() === "" ||
            !selectedTagIdList ||
            selectedTagIdList.length === 0
        ) {
            inputError()
            return
        }
        const yes = confirm("确定提交？")
        if (!yes) {
            return;
        }
        if(router.query && Object.keys(router.query).length>0){
            const newPost = {
                id: router.query.id,
                title: titleEl.current.value,
                excerpt: abstractEl.current.value,
                content: contentEl.current.value,
                coverUrl: coverUrl,
                tagIdList: selectedTagIdList
            }
            updatePost(newPost).then(r => {
                if (r.code === 200) {
                    successTip("更新成功！")
                    clearPost()
                } else {
                    uploadError(r.msg)
                }})
        } else{
            const newPost = {
                title: titleEl.current.value,
                excerpt: abstractEl.current.value,
                content: contentEl.current.value,
                coverUrl: coverUrl,
                tagIdList: selectedTagIdList,
            }
            insertPost(newPost).then(r => {
                    if (r.code === 200) {
                        successTip("创建成功！")
                        clearPost()
                    } else {
                        uploadError(r.msg)
                    }
                }
            )
        }

    }

    const clearPost = () => {
        titleEl.current.value = null
        coverEl.current.value = null
        abstractEl.current.value = null
        contentEl.current.value = null
        setCoverUrl("")
        selectedTagListEl.current.resetSelectedValues()
        setSelectedTagIdList([])
        setPreDefPostDetail({})
    }

    const uploadCover = () => {
        if (!coverEl.current ||
            !coverEl.current.files ||
            coverEl.current?.files.length === 0
        ) {
            inputError()
            return
        }

        let formData = new FormData()
        formData.append("multipartFile", coverEl.current?.files[0])
        uploadPostImage(formData).then(r => {
                if (r.code === 200) {
                    setCoverUrl(r.data.url)

                    successTip("文件上传成功")
                } else {
                    uploadError(r.msg)
                }
            }
        )


    }

    const uploadImage = () => {
        if (!imageEl.current ||
            !imageEl.current.files ||
            imageEl.current?.files.length === 0
        ) {
            inputError()
            return
        }

        let formData = new FormData()
        formData.append("multipartFile", imageEl.current?.files[0])
        uploadPostImage(formData).then(r => {
                if (r.code === 200) {
                    contentEl.current.value = contentEl.current.value + `  ![Image](${r.data.url})`
                    imageEl.current.value = null
                    successTip("文件上传成功")
                } else {
                    uploadError(r.msg)
                }
            }
        )

    }

    const addTag = () => {
        if (!newTagEl.current.value || newTagEl.current.value.trim() === "") {
            inputError()
            return
        }
        createTag(newTagEl.current.value).then(r => {
            if (r.code === 200) {
                successTip("tag创建成功！")
                newTagEl.current.value = null
                queryTagList().then(result => {
                    setTagList(result.data)
                })
            } else {
                uploadError(r.msg)
            }
        })

    }

    const removeTag = (id) => {
        const yes = confirm("确定删除?")
        if (!yes) {
            return
        }
        deleteTag(id).then(
            r => {
                if (r.code === 200) {
                    successTip("tag删除成功！")

                    queryTagList().then(result => {
                        setTagList(result.data)
                    })
                } else {
                    uploadError(r.msg)
                }
            }
        )
    }


    const editTag = (id) => {
        if (!newTagEl.current.value || newTagEl.current.value.trim() === "") {
            inputError()
            return
        }
        modifyTag(id, newTagEl.current.value).then(
            r => {
                if (r.code === 200) {
                    successTip("tag修改成功！")
                    newTagEl.current.value = null
                    queryTagList().then(result => {
                        setTagList(result.data)
                    })
                } else {
                    uploadError(r.msg)
                }

            }
        )
    }

    return (
        <div className="container mx-auto px-7 mb-8">
            <Head>
                <title>博客后台</title>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            {
                login && (
                    <div>
                        <div className="grid md:grid-cols-5 mb-2 grid-cols-2 gap-2">
                            <input
                                defaultValue={preDefPostDetail?.title}
                                ref={titleEl}
                                name="title"
                                id="title"
                                type="text"
                                placeholder="请输入标题"

                                className="panel-bg h1-color col-span-2 md:col-span-3 outline-none p-2  rounded-lg"
                            />
                            <button className={"bg-red-600 p-2 col-span-2 md:col-span-1 rounded-lg h1-color"}
                                    onClick={clearPost}>
                                清除
                            </button>
                            <button
                                className="bg-green-500 p-2 col-span-1 h1-color col-span-2 md:col-span-1 text-center rounded-lg"
                                onClick={submitPost}>
                                提交
                            </button>


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
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-2">
                            <textarea
                                defaultValue={preDefPostDetail?.excerpt}
                                className=" col-span-1 lg:col-span-3 panel-bg outline-none h1-color p-2 text-sm w-full rounded-lg "
                                placeholder="简介"
                                id="abstract"
                                name="abstract"
                                ref={abstractEl}
                            />
                            <div className="lg:col-span-2 rounded-lg  flex justify-center items-center">


                                <span>
                                    <span className={"w-1/3 h1-color"}>
                                        上传封面:
                                    </span>
                                    <input
                                        type="file"
                                        ref={coverEl}
                                        name="cover"
                                        accept="image/*"
                                        id="cover"
                                        onChange={uploadCover}
                                        className={"w-2/3 outline-none sub-panel-bg h1-color rounded-lg "}
                                    />
                                </span>

                                <span>
                                    <span className={"w-1/3 h1-color"}>
                                        上传图片:
                                    </span>

                                     <input
                                         type="file"
                                         ref={imageEl}
                                         name="postImage"
                                         accept="image/*"
                                         id="postImage"
                                         onChange={uploadImage}
                                         className={"outline-none w-2/3 sub-panel-bg h1-color ml-2 rounded-lg"}

                                     />
                                </span>


                            </div>
                        </div>


                        <div style={{height: 'calc(100vh - 13em)'}} className="grid lg:grid-cols-5 grid-cols-1 gap-2">
                            <textarea
                                style={{letterSpacing: "2px"}}
                                className="lg:col-span-3 outline-none  col-span-1 panel-bg h1-color p-2  w-full rounded-lg"
                                placeholder="markdown内容"
                                id="content"
                                name="content"
                                ref={contentEl}
                                defaultValue={preDefPostDetail?.content}

                            />
                            <div className={"lg:col-span-2"}>
                                <div className={"mb-4"}>
                                    <Multiselect
                                        placeholder={"请选择collection"}
                                        id={"multiselect"}
                                        ref={selectedTagListEl}
                                        options={tagList} // Options to display in the dropdown
                                        onSelect={selectTag} // Function will trigger on select event
                                        onRemove={removeSelectedTag} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                    />
                                </div>


                                <div
                                    style={{letterSpacing: '2px'}}
                                    className="h-fit h1-color p-4 panel-bg overflow-x-scroll  rounded-lg ">
                                    <div className={"text-center my-1"}>
                                        <input id={"newTag"}
                                               ref={newTagEl}
                                               placeholder={"新增tag名称"}
                                               className={"h-10 outline-none sub-panel-bg p-1 rounded-md md:w-1/2  w-full"}
                                        />
                                        <button className={"ml-2 bg-green-500 h-10 p-1 rounded-lg h1-color"}
                                                onClick={addTag}>
                                            添加
                                        </button>
                                    </div>

                                    <div className={"relative "}>
                                        {tagList.map(tag => (
                                            <div key={tag.id} className={"my-2 text-center"}>
                                                <span>
                                                {tag.name}
                                                </span>
                                                <span className={"absolute h-7 right-2"}>
                                                    <button
                                                        onClick={() => {
                                                            editTag(tag.id)
                                                        }}
                                                        className={"h-full bg-green-500 p-1 rounded-lg "}>
                                                        edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            removeTag(tag.id)
                                                        }}
                                                        className={"h-full ml-2 bg-red-600 p-1 rounded-lg "}>
                                                        delete
                                                    </button>
                                                </span>

                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </div>


                        </div>

                    </div>
                )
            }


        </div>
    );
};

export default PostEditor;
