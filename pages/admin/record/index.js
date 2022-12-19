import React, {useEffect, useRef, useState} from 'react';
import {
    createCollection,
    createRecord,
    queryCollectionList,
    removeCollection,
    updateCollection
} from "../../../services/record";
import {toast, ToastContainer} from "react-toastify";
import {uploadRecord} from "../../../services/file";
import useLogin from "../../../utils/useLogin";
import Head from "next/head";
import Multiselect from 'multiselect-react-dropdown';
import {useRouter} from "next/router";
import {queryPostDetailByPostId} from "../../../services/post";


const AdminRecord = () => {

    const login = useLogin()

    const [recordInfo, setRecordInfo] = useState({});
    const [selectedCollectionIdList, setSelectedCollectionIdList] = useState([]);

    const [collectionList, setCollectionList] = useState([]);



    const recordFileEl = useRef();
    const collectionEl = useRef();
    const titleEl = useRef();
    const descriptionEl = useRef();
    const newCollectionEl = useRef();


    useEffect(() => {
        queryCollectionList().then(
            res => {
                if(res.code===200){
                    setCollectionList(res.data)
                } else{
                    errorTip(res.msg)
                }
            }
        )
    }, []);





    const inputError = () => toast.error("输入错误，请重新输入");
    const successTip = (msg) => toast.success(msg)
    const errorTip = (msg) => toast.error("失败：" + msg)

    const clearRecord = () => {
        recordFileEl.current.value = null
        titleEl.current.value = null
        descriptionEl.current.value = null
        setSelectedCollectionIdList([])
        collectionEl.current.resetSelectedValues()
    }

    const submitRecord = () => {

        if (
            !titleEl.current.value ||
            titleEl.current.value.trim() === "" ||
            !descriptionEl.current.value ||
            descriptionEl.current.value.trim() === "" ||
            !recordInfo.url ||
            !selectedCollectionIdList ||
            selectedCollectionIdList.length === 0
        ) {
            inputError()
            return
        }

        const yes = confirm("确定提交？")
        if (!yes) {
            return;
        }

        const newRecord = {

            url: recordInfo.url,
            coverUrl: recordInfo.coverUrl,
            title: titleEl.current.value,
            description: descriptionEl.current.value,
            type: recordInfo.type,
            collectionIdList: selectedCollectionIdList
        }
        createRecord(newRecord).then(r => {
                if (r.code === 200) {
                    successTip("record创建成功！")
                    clearRecord()
                } else {
                    errorTip(r.msg)
                }
            }
        )
    }

    const submitRecordFile = () => {
        if (!recordFileEl.current ||
            !recordFileEl.current.files ||
            recordFileEl.current?.files.length === 0
        ) {
            inputError()
            return
        }

        let formData = new FormData()
        formData.append("multipartFile", recordFileEl.current?.files[0])
        uploadRecord(formData).then(r => {
                if (r.code === 200) {
                    setRecordInfo({
                        url: r.data.url,
                        coverUrl: r.data.coverUrl,
                        type: r.data.type
                    })
                    successTip("文件上传成功")

                } else {
                    errorTip(r.msg)
                }
            }
        )

    }

    const removeSelectedCollection = (selectedList, removedItem) => {
        const newIdList = selectedCollectionIdList.filter(collectionId => collectionId !== removedItem.id)
        setSelectedCollectionIdList(newIdList)
    }
    const selectCollection = (selectedList, selectedItem) => {
        setSelectedCollectionIdList([...selectedCollectionIdList, selectedItem.id])
    }

    const addCollection = () => {
        if (!newCollectionEl.current.value ||
            newCollectionEl.current.value.trim() === ""
        ) {
            inputError()
            return
        }

        createCollection(newCollectionEl.current.value).then(
            r => {
                if (r.code === 200) {

                    successTip("collection创建成功")
                    queryCollectionList().then(result => {
                        setCollectionList(result.data)
                    })
                    newCollectionEl.current.value = null
                } else {
                    errorTip(r.msg)
                }
            }
        )


    }

    const editCollection=(id)=> {
        if (!newCollectionEl.current.value || newCollectionEl.current.value.trim() === "") {
            inputError()
            return
        }

        updateCollection(id,newCollectionEl.current.value).then(
            r => {
                if (r.code === 200) {
                    successTip("collection修改成功！")
                    newCollectionEl.current.value = null
                    queryCollectionList().then(result => {
                        setCollectionList(result.data)
                    })
                } else {
                    errorTip(r.msg)
                }

            }
        )
    }

    const deleteCollection=(id)=> {
        const yes = confirm("确定删除?")
        if (!yes) {
            return
        }
        removeCollection(id).then(
            r => {
                if (r.code === 200) {
                    successTip("collection删除成功！")
                    queryCollectionList().then(result => {
                        setCollectionList(result.data)
                    })
                } else {
                    errorTip(r.msg)
                }
            }
        )
    }

    return (
        <div>

            <Head>
                <title>博客Admin</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {login && (
                <div className={"m-4 mt-10 p-2 grid grid-cols-1 md:grid-cols-7 gap-4 text-center"}>

                    <div className={"mb-8  h1-color panel-bg p-2 rounded-lg col-span-1 md:col-span-4 text-center"}>
                        <div>
                            <span className={"h1-color"}>
                                添加record
                            </span>
                        </div>


                        <input
                            type={"file"}
                            id={"recordFile"}

                            onChange={submitRecordFile}
                            className={"h1-color sub-panel-bg m-2  md:w-1/2 w-full mb-8 p-1 rounded-md"}
                            ref={recordFileEl}
                        />


                        <div className={"mx-auto md:w-1/2  w-full mb-8"}>
                            <Multiselect
                                placeholder={"请选择collection"}
                                id={"multiselect"}
                                ref={collectionEl}
                                options={collectionList} // Options to display in the dropdown
                                onSelect={selectCollection} // Function will trigger on select event
                                onRemove={removeSelectedCollection} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                            />
                        </div>

                        <div className={"mb-8"}>
                            <input
                                type={"text"}
                                id={"title"}
                                className={"outline-none h1-color sub-panel-bg p-1 rounded-md md:w-1/2  w-full "}
                                ref={titleEl}
                                placeholder={"请输入标题"}
                            />
                        </div>
                        <div className={"mb-4"}>
                          <textarea
                              id={"description"}
                              ref={descriptionEl}
                              placeholder={"请输入详情"}
                              className={" outline-none h1-color sub-panel-bg p-1 rounded-md md:w-1/2  w-full"}
                          />
                        </div>


                        <button className={"bg-red-600 p-2 rounded-lg h1-color mr-4"} onClick={clearRecord}>
                            清除
                        </button>
                        <button className={"bg-green-500 p-2 rounded-lg h1-color"} onClick={submitRecord}>
                            提交
                        </button>
                    </div>
                    <div className={"col-span-1  h1-color panel-bg p-2 rounded-lg md:col-span-3 text-center"}>
                        <div>
                            <div>
                            <span className={"h1-color"}>
                                添加collection：
                            </span>
                            </div>
                            <input id={"newCollection"}
                                   ref={newCollectionEl}
                                   placeholder={"请输入collection名称"}
                                   className={"outline-none m-2 h-10 sub-panel-bg p-1 rounded-md md:w-1/2  w-full"}
                            />
                            <button className={" bg-green-500 h-10 p-2 rounded-lg h1-color"} onClick={addCollection}>
                                添加
                            </button>
                        </div>

                        <div className={"relative "}>
                            {collectionList.map(collection => (

                                <div key={collection.id} className={"my-2 text-center"}>
                                    <span>
                                        {collection.name}
                                    </span>
                                    <span className={"absolute h-7 right-2"}>
                                                    <button
                                                        onClick={() => {
                                                            editCollection(collection.id)
                                                        }}
                                                        className={"h-full bg-green-500 p-1 rounded-lg "}>
                                                        edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteCollection(collection.id)
                                                        }}
                                                        className={"h-full ml-2 bg-red-600 p-1 rounded-lg "}>
                                                        delete
                                                    </button>
                                                </span>

                                </div>
                            ))}
                        </div>

                    </div>

                    <ToastContainer
                        position="top-center"
                        autoClose={1000}
                        hideProgressBar
                        closeOnClick
                        rtl={false}
                        newestOnTop={false}
                        pauseOnHover
                        limit={3}
                        theme="colored"
                    />
                </div>
            )}


        </div>
    );
};

export default AdminRecord;
