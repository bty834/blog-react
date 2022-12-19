import React from 'react';
import moment from "moment";
import Link from 'next/link'
import {CalendarLogo, ViewLogo} from "./logo/Logo";
import {queryPostList, queryTagListByPostId} from "../services/post";

const PostCard = ({post}) => {
    return (
        <div className="panel-bg -z-10 shadow-lg mb-8 rounded-lg flex-col w-full overflow-hidden">
            {post.coverUrl && (
                <Link href={`/post/detail/${post.id}`}>
                    <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="h-60 hover:scale-105 transition-transform duration-700 w-full object-cover shadow-lg rounded-t-lg"
                    />
                </Link>)
            }
            <h1 className="px-2 h1-color w-full flex justify-center mt-2  cursor-pointer text-xl font-bold">
                <Link href={`/post/detail/${post.id}`}>
                    {post.title}
                </Link>
            </h1>

            <div className="flex mb-2 w-full justify-center items-center ">

                <CalendarLogo/>

                <span className="h2-color mr-3 md:mr-5 text-sm">
                        {moment(post.created).format('YYYY-MM-DD')}
                </span>

                <span className="flex  h2-color justify-center items-center mr-3 md:mr-5">
                    {
                        post?.tagList.map((tag) => (
                                <span key={tag.id} className="text-sm">
                                    #{tag.name}
                                </span>
                        ))
                    }

                </span>

                {/*<ViewLogo/>*/}


            </div>

            <p className="h1-color w-full text-justify px-4 lg:px-10 mb-4">
                <Link href={`/post/detail/${post.id}`}>
                    {post.excerpt}
                </Link>
            </p>


        </div>
    );
};

export default PostCard;

