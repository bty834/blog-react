import {PostDetail, TagsPanel, PostWidget, Comments, CommentsForm} from "../../../components";
import {
    queryCommentListById,
    queryPostDetailByPostId, queryPostIdList,
    queryRecentPostList, queryTagList, queryTagListByPostId, removePostById
} from "../../../services/post";
import React, {useEffect, useState} from "react";
import Pagination from "../../../components/Pagination";
import useLogin from "../../../utils/useLogin";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import {CalendarLogo} from "../../../components/logo/Logo";
import moment from "moment/moment";
import Markdown from "../../../components/Markdown";
import Catalog from "../../../components/Catalog";


// const commentsPerPage = 5
const PostId = ({postId, postDetail, recentPosts,curTags}) => {


    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <div className="container mx-auto px-7 pb-4">
            <div className="grid grid-cols-1 xl:grid-cols-11 gap-5">
                <div className="col-span-1 xl:col-span-8">
                    {/*<Markdown content={postDetail?.content}/>*/}
                    <PostDetail postDetail={postDetail} curTags={curTags}/>
                    {/*<CommentsForm postId={postId}/>*/}
                    {/*<Comments comments={comments} total={commentsTotal}/>*/}
                    {/*<Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>*/}
                </div>

                <div className="col-span-1 xl:col-span-3">
                    <div className="relative xl:sticky top-8">
                        <PostWidget recentPosts={recentPosts}/>
                        <Catalog  content={"# "+postDetail?.title+"\n"+postDetail?.content}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostId;

// Fetch data at build time
export async function getStaticProps(context) {
    const postId = context.params.postId

    const
        [postDetailResult,
            recentPostsResult,
            curPostTagsResult] = await Promise.all([
                queryPostDetailByPostId(postId),
                queryRecentPostList(),
                queryTagListByPostId(postId)
            ]
        )
    return {
        props: {
            postId: postId,
            postDetail: postDetailResult?.data,
            recentPosts: recentPostsResult?.data,
            curTags: curPostTagsResult?.data
        },
        revalidate: 300
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const postIdsResult = await queryPostIdList();
    const postIdList = postIdsResult.data

    return {
        paths: postIdList.map((postId) => {
            return {params: {postId: postId.toString()}}
        }),
        fallback: true,
    };
}