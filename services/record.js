import request from "../utils/request";
import postId from "../pages/post/detail/[postId]";

export function queryCollectionList() {
    return request(
        {
            url: '/collectionList',
            method: 'get',
        }
    )
}

export function queryRecordList(pageNum,pageSize,order) {
    return request(
        {
            url: '/recordList',
            method: 'get',
            params: {pageNum,pageSize,order}
        }
    )
}

export function queryRecordListByCollectionId(collectionId,pageNum,pageSize,order) {
    return request(
        {
            url: '/recordList/collection/' + collectionId,
            method: 'get',
            params: {pageNum,pageSize,order}

        }
    )
}

export function createRecord(record) {
    return request(
        {
            url: '/record',
            method: 'post',
            data: record
        }
    )
}

export function removeRecord(recordId) {
    return request(
        {
            url: '/record/'+recordId,
            method: 'delete',
        }
    )
}
export function createCollection(name) {
    return request(
        {
            url: '/collection',
            method: 'post',
            params:{name}
        }
    )
}
export function updateCollection(id,name) {
    return request(
        {
            url: '/collection',
            method: 'put',
            params:{name,id}
        }
    )
}
export function removeCollection(id) {
    return request(
        {
            url: '/collection',
            method: 'delete',
            params:{id}
        }
    )
}