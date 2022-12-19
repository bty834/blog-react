import React, {useEffect, useState} from 'react';
import moment from "moment";
import {queryCommentListById} from "../services/post";


const Comments = ({comments,total}) => {

    return (
        <div className="panel-bg rounded-lg">
            <h3 className={"h1-color text-xl mb-4 font-semi-bold p-4 " + `${comments?.length > 0 ? "border-b" : ""}`}>
                共{total}条评论
            </h3>


            {comments?.map(
                (comment) => (
                    <div key={comment.id}
                         className="sub-panel-bg m-2 shadow-md rounded-lg  p-4">
                        <div className="mb-1">
                            <span className="h1-color font-bold mr-2">
                                {comment.name}
                            </span>
                            <span className="h2-color text-sm text-gray-700 ">
                                 {moment(comment.created).format('YYYY-MM-DD')}
                            </span>
                        </div>

                        <div className="h1-color whitespace-pre-line px-4 text-gray-600 w-full">
                            {comment.content}
                        </div>

                    </div>
                )
            )}


        </div>
    );
};

export default Comments;
