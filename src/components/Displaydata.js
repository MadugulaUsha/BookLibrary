import React, { useEffect, useState } from "react";
import PutMethod from "./PutMethod";
import "bootstrap/dist/css/bootstrap.min.css";


const Displaydata = () => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState(0);
  const clickHandle = (id, image, title, page, authr, red) => {
    let index = books.findIndex((item) => item.id === id);
    let bookscpy = books.map((a) => {
      return { ...a };
    });

    bookscpy[index].read = !bookscpy[index].read;
    setBooks(bookscpy);
    fetch(`http://localhost:3004/books/${id}`, {
      method: "PUT",
      headers: {
        Accept: "applicationa/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        pages: page,
        img: image,
        author: authr,
        read: !red,
      }),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getBooks();
      });
    });
  };
  let limit = 2;
  useEffect(() => {
    const getBooksData = async () => {
      const result = await fetch(
        `http://localhost:3004/books?_page=1&_limit=${limit}`
      );
      const data = await result.json();
      const total = result.headers.get("x-total-count");
      setPages(Math.ceil(total / limit));
      setBooks(data);
    };
    getBooksData();
  }, [limit]);

  // console.log(books);
  const getBooks = async (currentPage) => {
    const resultData = await fetch(
      `http://localhost:3004/books?_page=${currentPage}&_limit=${limit}`
    );
    const getdata = await resultData.json();
    return getdata;
  };

  const handlepageClick = async (data) => {
    let currentPage = data.selected + 1;
    const booksdata = await getBooks(currentPage);
    setBooks(booksdata);
  };

  return (
    <div>
      <PutMethod
        clickHandle={clickHandle}
        handlepageClick={handlepageClick}
        books={books}
        pages={pages}
      />
    </div>
  );
};

export default Displaydata;
