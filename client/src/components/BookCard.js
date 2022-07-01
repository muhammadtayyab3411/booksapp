import React from "react";
import { Link } from "react-router-dom";

export default function BookCard(props) {
  return (
    <>
      <div
        className="card text-center my-3 mx-3 col-md-4"
        style={{ width: "18rem" }}
      >
        <img
          src={
            props.image !== undefined || null
              ? `http://localhost:8000/bookImages/${props.image}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VVD1y0sJlEyYvFpb42T84CsrLC2f9IY5hw&usqp=CAU"
          }
          className="card-img-top"
          alt="..."
          style={{ height: "16rem", width: "18rem", alignSelf: "center" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.author}</p>
          <Link to={`/getbook/${props.id}`} className="btn btn-primary">
            Show Details
          </Link>
        </div>
      </div>
    </>
  );
}
