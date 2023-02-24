import Head from 'next/head'
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {TimelineIcon} from "../components";
import {ThemeContext} from "../components/context/ThemeContext";
import React, {useContext} from "react";
import Link from "next/link";
import {lineColor, contentStyle, contentArrowStyle, iconStyle} from "../components/timeline/setup"
import {skills} from "../components/SkillData"
import {queryTimelineList} from "../services/timeline";
import {toast, ToastContainer} from "react-toastify";


export default function Home({timelineData}) {

    const successTip = (msg) => toast.success(msg)
    const themeContext = useContext(ThemeContext);

    const clickToCopy = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL)
        successTip("复制成功！")
    }


    return (
        <div className="container mx-auto px-7 pb-4">
            <Head>
                <title>首页</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">

                <div
                    style={{minHeight: "60vh"}}
                    className="panel-bg grid grid-cols-1 md:grid-cols-2  h1-color col-span-1 lg:col-span-9  p-3 shadow-lg mb-4 rounded-lg "
                >
                    <div className={"col-span-1 flex items-center justify-center md:col-span-1 relative"}>
                        <img
                            className={"h-2/3 md:h-1/2 md:absolute md:top-1/4 rounded-lg md:left-10 xl:left-20"}
                            src={"/image/portrait.png"}
                            title={"打工人"}
                        />
                    </div>
                    <div className={"col-span-1 text-center md:col-span-1 relative"}>
                        <div className={"md:absolute md:top-1/4"}>
                            <div
                                className={"text-xl leading-normal md:leading-loose xl:leading-relaxed  md:text-4xl xl:text-5xl tracking-widest"}
                            >
                                你好， 这是一名<br/>
                                <span className={"gradient-text font-bold"}>Java后端</span>
                                开发者

                            </div>
                            <div className={"flex  items-center justify-center space-x-2"}>


                                <span

                                className={"text-sm tracking-tight cursor-pointer lg:text-lg"}
                                onClick={clickToCopy}
                                title={"点击复制"}
                                >
                                    {process.env.NEXT_PUBLIC_EMAIL}
                                    <svg t="1671055556738"
                                     className="icon inline-block"
                                     viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="1491" width="15" height="15">
                                    <path
                                        d="M665.6 224H205.3c-61.8 0-112 50.2-112 112v512c0 61.8 50.2 112 112 112h460.3c61.8 0 112-50.2 112-112V336c0-61.8-50.2-112-112-112z m48 624c0 26.5-21.5 48-48 48H205.3c-26.5 0-48-21.5-48-48V336c0-26.5 21.5-48 48-48h460.3c26.5 0 48 21.5 48 48v512z"
                                        fill="#CCCCCC" p-id="1492"></path>
                                    <path
                                        d="M820.7 64H301.3c-61.8 0-112 50.2-112 112h64c0-26.5 21.5-48 48-48h519.4c26.5 0 48 21.5 48 48v576c0 26.5-21.5 48-48 48v64c61.8 0 112-50.2 112-112V176c0-61.8-50.2-112-112-112z"
                                        fill="#CCCCCC" p-id="1493"></path>
                                    <path
                                        d="M243.5 400h384v64h-384zM243.5 560h384v64h-384zM243.5 720h246.8v64H243.5z"
                                        fill="#CCCCCC" p-id="1494"></path>
                                    </svg>
                                </span>
                                <a href={process.env.NEXT_PUBLIC_GITHUB}
                                   className={"text-sm tracking-tight cursor-pointer lg:text-lg"}
                                   title={"点击跳转到github"}
                                >
                                    <svg t="1677046739628" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="3133" width="22" height="22"><path
                                        d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z"
                                        p-id="3134"></path></svg>

                                </a>
                            </div>
                            <button
                                className={"mt-4 md:absolute md:right-2 p-2 text-sm md:text-md xl:text-lg rounded-lg search-btn"}
                                onClick={() => {
                                    alert("没有")
                                }}
                            >
                                查看成果
                            </button>
                        </div>

                    </div>


                </div>


                <div
                    className="panel-bg col-span-1 lg:col-span-3 h1-color p-3 shadow-lg mb-4 rounded-lg flex-col w-full overflow-hidden">

                    <div
                        className="mb-5 pb-3 border-b text-lg tracking-widest text-center">
                        技术栈
                    </div>

                    {
                        skills?.length > 0 && (
                            skills.map((skill, index) => (
                                <a key={index} target={"_blank"} href={skill.link}
                                   className="hover:text-pink-500  cursor-pointer flex items-center justify-center my-2"
                                >
                                    {skill.svg}
                                    {skill.name}
                                </a>
                            ))
                        )
                    }

                </div>
            </div>
            <div className={"overflow-x-hidden"}>
                <VerticalTimeline
                    lineColor={lineColor[themeContext.theme]}>
                    {timelineData?.length > 0 && (
                        timelineData?.map((data, index) => (
                            <VerticalTimelineElement
                                key={index}
                                contentStyle={contentStyle[themeContext.theme]}
                                contentArrowStyle={contentArrowStyle[themeContext.theme]}
                                date={data.start + " - " + data.end}
                                iconStyle={iconStyle[themeContext.theme]}
                                icon={<TimelineIcon phase={data.phase}/>}
                            >
                                <Link href={data.link} target="_blank">
                        <span className="hover:text-pink-500 mr-2 font-bold">
                            {data.title}
                        </span>
                                </Link>
                                <div>
                                    {data.subTitle}
                                </div>
                                <div className="text-justify">
                                    {data.content}
                                </div>
                            </VerticalTimelineElement>
                        ))
                    )}
                </VerticalTimeline>
            </div>

            <div className={"h1-color text-sm text-center my-10"}>
                <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2023000569号</a>
                <a
                    className={"flex items-center justify-center"}
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34072202000271"
                >
                    <img className={"m-0 p-0"} src="/image/gonan.png" alt={"公安"}/>
                    <span>
                        皖公网安备 34072202000271号
                    </span>
                </a>
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
    )
}

export async function getStaticProps() {

    const result = await queryTimelineList()
    // console.log(result)
    return {
        props: {
            timelineData: result.data,
        },
        revalidate: 1200
    };
}