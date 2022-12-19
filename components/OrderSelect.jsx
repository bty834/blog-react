import React from 'react';

const orderList=[
    {
        value:"0",
        label:"时间降序"
    },
    {
        value:"1",
        label:"时间升序"
    },
]

const OrderSelect = ({selectedOrder,setSelectedOrder}) => {

    return (
        <span className={"h-6 absolute right-0 "}>
            {orderList.map(order=>(
                <span
                    key={order.value}
                    style={selectedOrder===order.value ? {color:"hotpink"}:{}}
                    className={"h1-color h-full sub-panel-bg shadow-lg cursor-pointer no-color-transition p-1 ml-1 rounded-md text-sm"}
                    onClick={()=>{setSelectedOrder(order.value)}}
                >
                    {order.label}
                </span>
            ))}
        </span>
    )


};

export default OrderSelect;
