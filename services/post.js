import request from "../utils/request";


export function queryPostList(pageNum,pageSize ,order) {
    return request(
        {
            url: '/postList',
            method: 'get',
            params:{order,pageNum,pageSize}
        }
    )
}
export function queryPostListByTagId(tagId,pageNum,pageSize,order) {
    return request(
        {
            url: '/tagPostList' ,
            method: 'get',
            params:{tagId,pageNum,pageSize,order}
        }
    )
}
export function queryPostIdList() {
    return request(
        {
            url: '/postIdList',
            method: 'get',
        }
    )
}

export function queryPostDetailByPostId(postId) {
    return request(
        {
            url: '/post/' + postId,
            method: 'get',
        }
    )
}

export function queryTagList() {
    return request(
        {
            url: '/tagList',
            method: 'get',
        }
    )
}

export function queryTagIdList() {
    return request(
        {
            url: '/tagIdList',
            method: 'get',
        }
    )
}



export function queryCommentListById(postId,pageNum,pageSize,order) {
    return request(
        {
            url: '/comment/' + postId,
            method: 'get',
            params:{pageNum,pageSize,order}
        }
    )
}

export function queryTagListByPostId(postId) {
    return request(
        {
            url: '/tag/' + postId,
            method: 'get',
        }
    )
}

export function queryRecentPostList() {
    return request(
        {
            url: '/recentPostList/5',
            method: 'get',
        }
    )
}

export function insertComment(comment) {
    return request(
        {
            url: '/comment',
            method: 'post',
            data: comment
        }
    )
}

export function removePostById(postId) {
    return request(
        {
            url: '/post/'+postId,
            method: 'delete',
        }
    )
}

export function insertPost(post) {
    return request(
        {
            url: '/post',
            method: 'post',
            data:post
        }
    )
}
export function updatePost(post) {
    return request(
        {
            url: '/post',
            method: 'put',
            data:post
        }
    )
}


export function createTag(tagName) {
    return request(
        {
            url: '/tag/'+tagName,
            method: 'post',
        }
    )
}

export function deleteTag(tagId) {
    return request(
        {
            url: '/tag/'+tagId,
            method: 'delete',
        }
    )
}
export function modifyTag(tagId,tagName) {
    return request(
        {
            url: '/tag',
            method: 'put',
            params:{tagId,tagName}
        }
    )
}

export function searchPostByTerm(searchTerm) {
    return request(
        {
            url: '/search/post',
            method: 'get',
            params:{searchTerm}
        }
    )
}