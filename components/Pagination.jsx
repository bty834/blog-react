import React from 'react';
import ReactPaginate from "react-paginate";

const Pagination = ({pageCount,handlePageClick}) => {
    return (
        <div className={"mb-10  text-xl font-bold"}>
            {
                pageCount>1 && (
                    <ReactPaginate
                        className={"pagination flex  rounded-lg justify-center items-center"}
                        breakLabel="..."
                        nextLabel="next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        activeClassName={"active"}
                        previousClassName={"prev"}
                        nextClassName={"next"}
                        pageClassName={"page"}
                        disabledClassName={"disabled"}
                        previousLabel="prev"
                        renderOnZeroPageCount={null}
                    />
                )
            }

        </div>
    );
};

export default Pagination;
