import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();

  const [bookId, setBookId] = useState();
  const [bookName, setBookName] = useState();
  const [bookIsbn, setBookIsbn] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [bookPublisher, setBookPublisher] = useState();
  const [updatedDate, setUpdatedDate] = useState();

  useEffect(() => {
    async function fetchBook(book_id) {
      const res = await fetch(`http://localhost:8000/getbook/${book_id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      return data;
    }

    if (!id) return;
    fetchBook(id).then((book) => {
      const { title, isbn, author } = book;
      const { published_date, publisher, updated_date } = book;

      setBookId(id);
      setBookName(title);
      setBookAuthor(author);
      setPublishedDate(published_date);
      setBookPublisher(publisher);
      setUpdatedDate(updated_date);
      setBookIsbn(isbn);
    });
  }, [id]);

  const updateBook = useCallback(
    async function () {
      await fetch(`http://localhost:8000/updatebook/${bookId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookName,
          isbn: bookIsbn,
          author: bookAuthor,
          published_date: publishedDate,
          publisher: bookPublisher,
          updated_date: updatedDate,
        }),
      });
    },
    [
      bookAuthor,
      bookIsbn,
      bookName,
      bookPublisher,
      publishedDate,
      updatedDate,
      bookId,
    ]
  );

  const updateField = (setter) => (event) => {
    setter(() => event.target.value);
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    if (isLoading) return;

    updateBook()
      .then(() => {
        navigate("/showbooks");
      })
      .catch((error) => {
        window.alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container text-center my-3">
        <h1>{props.title}</h1>
      </div>
      <div className="container w-50 text-center create-book-container mt-2 py-4 px-5">
        {bookId ? (
          <form method="POST">
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter book name here"
                name="book_title"
                value={bookName}
                onChange={updateField(setBookName)}
              />
            </div>
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Book ISBN
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter book isbn here"
                name="book_isbn"
                value={bookIsbn}
                onChange={updateField(setBookIsbn)}
              />
            </div>
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter book author here"
                name="book_author"
                value={bookAuthor}
                onChange={updateField(setBookAuthor)}
              />
            </div>
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Published Date
              </label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter published date here"
                name="published_date"
                value={publishedDate}
                onChange={updateField(setPublishedDate)}
              />
            </div>
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter publisher here"
                name="book_publisher"
                value={bookPublisher}
                onChange={updateField(setBookPublisher)}
              />
            </div>
            <div className="mb-1 text-center">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Update Date
              </label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter update date here"
                name="update_date"
                value={updatedDate}
                onChange={updateField(setUpdatedDate)}
              />
            </div>
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={handleSubmission}
            >
              {props.btnText}
            </button>
          </form>
        ) : (
          "Book details are being loaded..."
        )}
      </div>
    </>
  );
}
