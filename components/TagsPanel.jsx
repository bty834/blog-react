const TagsPanel = ({tags, selectedTagId, setSelectedTagId}) => {

    return (
        <div className="panel-bg h1-color shadow-lg rounded-lg p-3 mb-5">
            <h3 className="mb-4 font-semi-bold border-b pb-2">
                标签索引
            </h3>
            <span
                className={((selectedTagId==0)?"text-pink-500 ":"")+" cursor-pointer p-1 rounded-lg inline-block mx-2 "}
                onClick={()=>{
                    setSelectedTagId(0)
                }}
            >
                全部
            </span>
            {tags.map((tag) => (

                <span
                    key={tag.name}
                    onClick={()=>{
                        setSelectedTagId(tag.id)
                    }}

                    className={((selectedTagId==tag.id)?"text-pink-500 ":" ")+" cursor-pointer p-1 rounded-lg inline-block mx-2 "}
                >
                        #{tag.name}({tag.amount})
                </span>

            ))}
        </div>
    );
};

export default TagsPanel;

