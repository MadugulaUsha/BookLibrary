import React from "react";
import ReactPaginate from "react-paginate";
import "./Displaydata.css";

const PutMethod = ({ clickHandle, handlepageClick, books, pages }) => {
  return (
    <div>
      <h1 className="heading">Books In Library</h1>
      <br />
      {/* <table className="table table-bordered" id="tablee">
        <thead className="thead-dark">
          <tr className="hovering">
            <th>Update Status</th>
            <th>S.No</th>
            <th>Image</th>
            <th>Title</th>
            <th>No.Pages</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
</table> */}
      {books.map((val) => {
        return (
          <div key={val.id} className="card border-primary mb-3 header" style={{ width: " 18rem" }}>
            <img class="card-img-top" src={val.img} alt="book" />
            <div class="card-body">
              <div>
                <h3>{val.title}</h3>
              </div>
              <div>Pages:{val.pages}</div>
              <div>Author:{val.author}</div>
              <div>
                <input
                  type="checkbox"
                  checked={val.read}
                  onClick={() => {
                    clickHandle(
                      val.id,
                      val.img,
                      val.title,
                      val.pages,
                      val.author,
                      val.read
                    );
                  }}
                />  
                <span data-testid="id">{val.read ? "Read" : "Not Read"}</span>
              </div>
            </div>
          </div>
        );
      })}

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlepageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PutMethod;
