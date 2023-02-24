import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Link from "next/link";
import {queryCollectionList, queryRecordList, queryRecordListByCollectionId, removeRecord} from "../../services/record";
import {toast, ToastContainer} from "react-toastify";
import useLogin from "../../utils/useLogin";
import Masonry from "react-masonry-css";
import moment from "moment/moment";
import Pagination from "../../components/Pagination";


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 1,
    500: 1
};

const recordsPerPage = 20
const Record = () => {


    const login = useLogin()
    const [selectedCollectionId, setSelectedCollectionId] = useState("0");
    const [collections, setCollections] = useState([]);
    const [records, setRecords] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [recordsTotal, setRecordsTotal] = useState(0);


    const successTip = (msg) => toast.success(msg)
    const errorTip = (msg) => toast.error(msg)


    useEffect(() => {
        getCollections()
    }, []);

    useEffect(() => {
        getRecords(1)
    }, [selectedCollectionId]);

    const getRecords = async (pageNum) => {
        // console.log("触发useEffect")
        if (selectedCollectionId === "0") {
            const recordsResult = await queryRecordList(pageNum, recordsPerPage, 0)
            setRecordsTotal(recordsResult?.total)
            setPageCount(Math.ceil(recordsResult?.total / recordsPerPage))
            setRecords(recordsResult.data)
        } else {
            const recordsResult = await queryRecordListByCollectionId(selectedCollectionId, 1, 10, 0)
            setRecordsTotal(recordsResult?.total)
            setPageCount(Math.ceil(recordsResult?.total / recordsPerPage))
            setRecords(recordsResult.data)
        }
    }
    const handlePageClick = (event) => {
        getRecords(event.selected + 1)
    };

    const getCollections = async () => {
        const collectionsResult = await queryCollectionList();
        setCollections(collectionsResult.data)
    }

    const changeCollection = (newCollectionId) => {
        // console.log("触发changeCollection setseletedcollection前")
        setSelectedCollectionId(newCollectionId)
        // console.log("触发changeCollection setseletedcollection后")
    }

    const deleteRecord = (id, e) => {
        e.preventDefault()
        e.stopPropagation()

        const yes = confirm("确定删除？")
        if (!yes) {
            return
        }
        removeRecord(id).then(
            r => {
                if (r.code === 200) {
                    successTip("删除成功！")
                    getRecords(1)
                } else {
                    errorTip("失败：" + r.msg)
                }
            }
        )

    }

    return (
        <div className="container mx-auto px-7 pb-4">
            <Head>
                <title>记录</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div>
                <div className="mb-2 h1-color">
                    主题：
                    <button

                        className={"panel-bg rounded-lg mx-2 p-2 no-color-transition " + ('0' == selectedCollectionId ? " text-pink-500" : "")}

                        onClick={() => {
                            // setSelectedCollectionId(e.target.value)
                            changeCollection("0")
                        }}

                    >
                        全部
                    </button>

                    {collections && collections.map(
                        (collection) => (
                            <button
                                key={collection.id}
                                className={"panel-bg rounded-lg mx-2 p-2 no-color-transition " + (collection.id == selectedCollectionId ? " text-pink-500" : "")}
                                onClick={() => {
                                    // setSelectedCollectionId(e.target.value)
                                    changeCollection(collection.id)
                                }}

                            >
                                {collection.name}
                            </button>
                        )
                    )}
                </div>
                <div className={"mb-4 h1-color"}>
                    共{recordsTotal}条记录
                </div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {records?.length > 0 && records.map((record) => (
                        <Link key={record.id} href={record.url} target={'_blank'}>
                            <div className="hover:scale-105 mb-8 relative  text-center   transition-transform duration-500">
                                {login && (
                                    <span
                                        onClick={(e) => {
                                            deleteRecord(record.id, e)
                                        }}
                                        title={"delete"}
                                        className={"absolute sub-panel-bg right-2 top-2 p-2 rounded-full hover:scale-105 transition"}
                                    >
                                    <svg
                                        t="1670501491625" className="icon"
                                        viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2237" width="30"
                                        height="30">
                                    <path
                                        d="M909.3 192.2H767.5c-0.8-5.4-2.5-10.8-5.1-16.1l-34.9-71.7c-11.8-24.3-40-40.1-71.3-40.1h-288c-31.3 0-59.5 15.8-71.3 40.1l-35 71.7c-2.6 5.4-4.3 10.8-5.2 16.1H113.3c-27.5 0-50 22.5-50 50v27.6c0 27.5 22.5 50 50 50h77.8v589.8c0 27.5 22.5 50 50 50h539.6c27.5 0 50-22.5 50-50V319.7h78.7c27.5 0 50-22.5 50-50v-27.6c-0.1-27.4-22.6-49.9-50.1-49.9zM386 799.2c0 17.9-14.6 32.5-32.5 32.5S321 817.1 321 799.2V416.3c0-17.9 14.6-32.5 32.5-32.5s32.5 14.6 32.5 32.5v382.9z m160.9 0c0 17.9-14.6 32.5-32.5 32.5s-32.5-14.6-32.5-32.5V416.3c0-17.9 14.6-32.5 32.5-32.5s32.5 14.6 32.5 32.5v382.9z m160.2 0c0 17.9-14.6 32.5-32.5 32.5s-32.5-14.6-32.5-32.5V416.3c0-17.9 14.6-32.5 32.5-32.5s32.5 14.6 32.5 32.5v382.9z"
                                        p-id="2238" fill="#d81e06"></path>
                                    </svg>
                                </span>
                                )}
                                <img className="mb-2 mx-auto rounded-md "
                                     src={record.coverUrl.trim() === "" ? record.url : record.coverUrl}
                                     alt={record.title}/>
                                <span className="sub-panel-bg h1-color p-1 rounded-lg">
                                    {record.title} - {moment(record.created).format('YYYY-MM-DD')}
                                </span>

                            </div>
                        </Link>
                    ))}
                </Masonry>
                {pageCount > 1 && (
                    <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
                )}


            </div>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                rtl={false}
                newestOnTop={false}
                limit={3}
                theme="colored"
            />
        </div>

    );
};

export default Record;

