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
                <title>Bao的博客</title>
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
                            <div

                                className={"text-sm tracking-tight cursor-pointer lg:text-lg"}
                                onClick={clickToCopy}
                                title={"点击复制"}
                            >
                                {process.env.NEXT_PUBLIC_EMAIL}
                                <svg t="1671055556738"
                                     className="icon inline-block"
                                     viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="1491" width="15" height="15"><path
                                    d="M665.6 224H205.3c-61.8 0-112 50.2-112 112v512c0 61.8 50.2 112 112 112h460.3c61.8 0 112-50.2 112-112V336c0-61.8-50.2-112-112-112z m48 624c0 26.5-21.5 48-48 48H205.3c-26.5 0-48-21.5-48-48V336c0-26.5 21.5-48 48-48h460.3c26.5 0 48 21.5 48 48v512z"
                                    fill="#CCCCCC" p-id="1492"></path><path
                                    d="M820.7 64H301.3c-61.8 0-112 50.2-112 112h64c0-26.5 21.5-48 48-48h519.4c26.5 0 48 21.5 48 48v576c0 26.5-21.5 48-48 48v64c61.8 0 112-50.2 112-112V176c0-61.8-50.2-112-112-112z"
                                    fill="#CCCCCC" p-id="1493"></path><path
                                    d="M243.5 400h384v64h-384zM243.5 560h384v64h-384zM243.5 720h246.8v64H243.5z"
                                    fill="#CCCCCC" p-id="1494"></path>
                                </svg>

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
                                <span key={index} onClick={() => {
                                    window.open(skill.link)
                                }} className="hover:text-pink-500  cursor-pointer flex items-center justify-center my-2">
                                    {skill.svg}
                                    {skill.name}
                                </span>
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
                <a href="https://beian.miit.gov.cn/" target="_blank">皖ICP备2023000569号-1</a>
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