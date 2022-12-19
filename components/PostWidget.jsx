
import Link from "next/link"
import {BergerLogo} from "./logo/Logo";




const PostWidget = ({recentPosts}) => {

    return (
        <div className="panel-bg h1-color shadow-lg rounded-lg p-3 mb-5">
            <h3 className="mb-4 font-semi-bold border-b pb-2">
                {'最近发文'}
            </h3>
            {recentPosts.map(
                (post) => (
                    <Link
                        key={post.title}
                        href={`/post/detail/${post.id}`}
                    >
                        <div
                            className="hover:text-pink-500 flex items-center w-full mb-2">
                            <span>
                                <BergerLogo />
                            </span>
                            {post.title}
                        </div>
                    </Link>
                )
            )}


        </div>
    );
};

export default PostWidget;
