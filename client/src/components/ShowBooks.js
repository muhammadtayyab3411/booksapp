import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

// let data, res;

export default function ShowBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/getBooks", {
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setBooks(data);
      // console.log(res);
    }

    fetchBooks();
  }, []);
  return (
    <>
      <h1 className="my-3 text-center mx-auto">Books to Read</h1>
      <hr />
      <div
        className="container row"
        style={{ marginLeft: "auto", marginRight: "2%" }}
      >
        {books.map((book) => {
          return (
            <BookCard
              key={book._id}
              name={book.title}
              image={book.book_image}
              author={book.author}
              id={book._id}
            />
          );
        })}
      </div>
    </>
  );
}
