import React, { useState } from "react";

function CreateBook(props) {
  const [bookName, setBookName] = useState("");
  const [bookImage, setBookImage] = useState();
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  async function addBook(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", bookName);
    formData.append("book_image", bookImage);
    formData.append("isbn", bookIsbn);
    formData.append("author", bookAuthor);
    formData.append("published_date", publishedDate);
    formData.append("publisher", bookPublisher);
    formData.append("updated_date", updatedDate);

    const res = await fetch("http://localhost:8000/addBook", {
      method: "POST",
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
      body: formData,
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Validation Error");
    } else {
      window.alert("Book Added");
      setBookName("");
      setBookImage("");
      setBookIsbn("");
      setBookAuthor("");
      setPublishedDate("");
      setBookPublisher("");
      setUpdatedDate("");
    }
  }

  function changeBookName(e) {
    setBookName(e.target.value);
  }
  function changeBookImage(e) {
    setBookImage(e.target.files[0]);
    console.log(bookImage);
  }
  function changeBookIsbn(e) {
    setBookIsbn(e.target.value);
  }
  function changeBookAuthor(e) {
    setBookAuthor(e.target.value);
  }
  function changePublishedDate(e) {
    setPublishedDate(e.target.value);
  }
  function changeBookPublisher(e) {
    setBookPublisher(e.target.value);
  }
  function changeUpdatedDate(e) {
    setUpdatedDate(e.target.value);
  }
  return (
    <>
      <div className="container text-center my-3">
        <h1>{props.title}</h1>
      </div>
      <div className="container w-50 text-center create-book-container mt-2 py-4 px-5">
        <form method="POST" action="/addBook" encType="multipart/form-data">
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
              onChange={changeBookName}
            />
          </div>

          <div className="mb-1 text-center">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Book Image
            </label>
            <input
              action={"http://localhost:8000/addbook"}
              accept=".png,.jpg,.jpeg,.webp"
              type="file"
              name="book_image"
              className="form-control"
              id=""
              // value={bookImage}
              onChange={changeBookImage}
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
              onChange={changeBookIsbn}
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
              onChange={changeBookAuthor}
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
              onChange={changePublishedDate}
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
              onChange={changeBookPublisher}
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
              onChange={changeUpdatedDate}
            />
          </div>
          {/* <button className="btn btn-primary" type="submit" onClick={addBook}>
            {props.btnText}
          </button> */}
          <input
            type="submit"
            value={props.btnText}
            className="btn btn-primary"
            onClick={addBook}
          />
        </form>
      </div>
    </>
  );
}

export default CreateBook;
