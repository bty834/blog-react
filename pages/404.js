// pages/404.js
import Lottie from "lottie-react";
import error404Json from "../public/lottie/error404.json"

export default function Custom404() {
    return (
        <Lottie className="h-80 lg:my-20" animationData={error404Json} loop={true}/>
    )
}
