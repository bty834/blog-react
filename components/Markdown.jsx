import React from 'react';
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark as codeStyle} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {BergerLogo} from "./logo/Logo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const code = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={codeStyle}
            language={match[1]}
            PreTag="div"
            {...props}
        />
    ) : (
        <span className="text-sm mx-1 px-1" style={{color: '#c7254e', backgroundColor: '#f9f2f4', borderRadius: '2px'}}>
                                    {children}
                                </span>
        // <code className={className} {...props}>
        //     {children}
        // </code>
    )
}

export const h1 = ({node, ...props}) => {
    return (
        <div className="h1-color text-2xl mt-5 mb-3 font-bold" {...props} />
    );
};

export const h2 = ({node, ...props}) => {
    return (
        <div className="h2-color text-xl mt-3 mb-1 font-bold" {...props} />
    );
};

export const h3 = ({node, ...props}) => {
    return (
        <div className="h2-color text-lg mt-2 mb-1 font-bold" {...props} />
    );
};

export const h4 = ({node, ...props}) => {
    return (
        <div className="h2-color mt-2 mb-1 font-bold" {...props} />
    );
};

export const a = ({node, ...props}) => {
    return (
        <a href={node.properties.href} target="_blank"
           className="text-blue-600 hover:text-blue-500 mx-1 rounded-sm hover:shadow-md underline cursor-pointer" {...props} />
    );
};

export const blockquote = ({node, ...props}) => {
    return (
        <div  className="my-2 bg-gray-300 text-stone-800 shadow-md  rounded-lg p-4" {...props}/>
    );
};

export const li = ({node, ...props}) => {

    if (props.ordered) {
        return (

            <div className="h2-color sub-panel-bg flex shadow-md my-2 rounded-lg p-1">
                {props.index + 1}. <div className="ml-2" {...props}/>
            </div>
        )
    }

    return (
        <div className="flex sub-panel-bg items-center shadow-md my-2  h2-color rounded-lg p-1 ">
            <span>
                 <BergerLogo />
            </span>

            <div {...props}/>
        </div>
    );
};

const Markdown = ({content})=>(
    <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
            code: code,
            h1: h1,
            h2: h2,
            h3: h3,
            h4: h4,
            a: a,
            blockquote: blockquote,
            li:li
        }}
    />
)

export default Markdown