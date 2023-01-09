import React, {useContext} from 'react';
import Head from "next/head";
import {ToastContainer, Slide, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThemeContext} from "../../components/context/ThemeContext";
import Markdown from "../../components/Markdown";
import Readme from "../../README.md"

const About = () => {

    const themeContext = useContext(ThemeContext);

    return (
        <div className="container mx-auto px-7 pb-4">
            <Head>
                <title>Bao的博客</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="flex justify-center items-center ">
                    <span className={"lg:w-2/3 w-full rounded-lg my-8 panel-bg h1-color p-4 "}>
                        <Markdown content={Readme}/>
                    </span>
            </div>

            {/*<div className="flex items-center  my-5 md:my-8 justify-center">*/}

            {/*    <span*/}
            {/*        className={"panel-bg hover:shadow-lg rounded-lg grid " + `md:grid-cols-${linkData?.length + autoCopyData?.length} ` + "grid-cols-1 gap-2"}>*/}
            {/*          {linkData?.length > 0 && (*/}
            {/*              linkData?.map(*/}
            {/*                  (data, index) => (*/}
            {/*                      <span*/}
            {/*                          key={index}*/}
            {/*                          title={data.tip}*/}
            {/*                          className="col-span-1 mx-2 p-2  hover:scale-105 transition cursor-pointer"*/}
            {/*                          onClick={() => {*/}
            {/*                              window.open(data.link)*/}
            {/*                          }}*/}
            {/*                      >*/}
            {/*                    {data.logo}*/}
            {/*                </span>*/}
            {/*                  )*/}
            {/*              )*/}
            {/*          )}*/}

            {/*        {autoCopyData?.length > 0 && (*/}
            {/*            autoCopyData?.map(*/}
            {/*                (data, index) => (*/}
            {/*                    <span*/}
            {/*                        title={data.tip}*/}
            {/*                        key={index}*/}
            {/*                        className="col-span-1 mx-2 p-2 hover:scale-105 transition cursor-pointer"*/}
            {/*                        onClick={() => {*/}
            {/*                            navigator.clipboard.writeText(data.data)*/}
            {/*                            commentSuccess()*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        {data.logo}*/}
            {/*                    </span>*/}
            {/*                )*/}
            {/*            )*/}
            {/*        )*/}

            {/*        }*/}
            {/*    </span>*/}


            {/*</div>*/}
            {/*<div className="h1-color mt-5  text-center text-sm">*/}
            {/*    打赏打赏*/}
            {/*</div>*/}

            {/*<div className="w-full grid lg:grid-cols-6  grid-cols-1">*/}
            {/*    <img*/}
            {/*        width={200}*/}
            {/*        src={'/image/zhifubao.jpg'}*/}
            {/*        alt="支付宝"*/}
            {/*        className="lg:col-start-3 col-span-1 mx-auto"*/}
            {/*    />*/}
            {/*    <img*/}
            {/*        width={200}*/}
            {/*        src={'/image/vx.jpg'}*/}
            {/*        alt="Wechat"*/}
            {/*        className=" lg:col-start-4 col-span-1 mx-auto"*/}

            {/*    />*/}
            {/*</div>*/}

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                pauseOnHover
                closeOnClick
                newestOnTop={false}
                rtl={false}
                transition={Slide}
                limit={3}
                theme={themeContext.theme === "light" ? "light" : "dark"}
            />

        </div>
    );
};

export default About;

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}