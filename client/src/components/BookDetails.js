import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`/getbook/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setBook(data);
    }
    fetchBook();
  }, [id]);

  async function deleteBook(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/deletebook/${id}`, {
      method: "DELETE",
    });
    if (res.status === 201) {
      window.alert("Book Deleted");
      window.location.href = "http://localhost:3000/showbooks";
    } else {
      window.alert("Internal server Error");
    }
  }
  return (
    <>
      <div className="container row" style={{ height: "30rem" }}>
        <img
          src={
            book.book_image !== undefined || null
              ? `http://localhost:8000/bookImages/${book.book_image}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VVD1y0sJlEyYvFpb42T84CsrLC2f9IY5hw&usqp=CAU"
          }
          className="img-thumbnail col-md-4"
          alt="..."
        />
        <div className="col m-auto">
          <Link to={`/updatebook/${id}`} className="btn btn-warning mx-2 mb-3">
            update book
          </Link>

          <Link
            to={`/deletebook/${id}`}
            className="btn btn-danger mx-2 mb-3"
            onClick={deleteBook}
          >
            delete book
          </Link>
          <div className="d-flex">
            <label htmlFor="title" className="mx-2">
              Book Title:
            </label>
            <p className="fw-bold text-uppercase">{book.title}</p>
          </div>
          <div className="d-flex">
            <label htmlFor="author" className="mx-2">
              author:
            </label>
            <p className="fw-bold text-uppercase">{book.author}</p>
          </div>
          <div className="d-flex">
            <label htmlFor="published date" className="mx-2">
              Published Date:
            </label>
            <p className="fw-bold text-uppercase">{book.published_date}</p>
          </div>
          <div className="d-flex">
            <label htmlFor="publisher" className="mx-2">
              Publisher:
            </label>
            <p className="fw-bold text-uppercase">{book.publisher}</p>
          </div>
          <div className="d-flex">
            <label htmlFor="updated date" className="mx-2">
              Update Date:
            </label>
            <p className="fw-bold text-uppercase">{book.updated_date}</p>
          </div>
          <Link to="/showbooks" className="btn btn-primary mx-2">
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
