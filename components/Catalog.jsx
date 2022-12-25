import MarkdownNavbar from 'markdown-navbar';
// The default style of markdown-navbar should be imported additionally
// import 'markdown-navbar/dist/navbar.css';

const Catalog = ({content}) => {
    return (
        <div className="panel-bg h1-color shadow-lg rounded-lg p-3 mb-5">
            <h3 className="mb-4 font-semi-bold border-b pb-2">
                {'目录'}
            </h3>
            {
                content && (
                    <MarkdownNavbar
                        source={content}
                    />
                )
            }
        </div>
    );
};

export default Catalog;
