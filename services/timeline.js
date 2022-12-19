import request from "../utils/request";


export function queryTimelineList() {
    return request(
        {
            url: '/timeline',
            method: 'get',
        }
    )
}

export function updateTimeline(timeline) {
    return request(
        {
            url: '/timeline',
            method: 'put',
            data: timeline
        }
    )
}
export function createTimeline(timeline) {
    return request(
        {
            url: '/timeline',
            method: 'post',
            data: timeline
        }
    )
}
export function deleteTimeline(timelineId) {
    return request(
        {
            url: '/timeline/'+timelineId,
            method: 'delete',
        }
    )
}
