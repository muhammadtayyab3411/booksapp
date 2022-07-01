import "./App.css";
import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import Navbar from "./components/Navbar";
import ShowBooks from "./components/ShowBooks";
import BookDetails from "./components/BookDetails";
import UpdateBook from "./components/UpdateBook";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import Cookies from "js-cookie";

function App() {
  const [isValidUser, setIsValidUser] = useState();
  const [userData, setUserData] = useState();
  const verifyUser = async () => {
    const res = await fetch("/isAuthenticated", {
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      setUserData(data[0].name);
    }
    // console.log(data);

    console.log(res.status);
    res.status === 200 ? setIsValidUser(true) : setIsValidUser("false");
    // console.log("user is valid", isValidUser);
  };
  verifyUser();
  return (
    <Router>
      <Fragment>
        <Navbar
          title="Books App"
          isValidUser={isValidUser}
          userData={userData}
        />
        <Routes>
          <Route path="/" element={<ShowBooks />}></Route>
          <Route
            path="/addbook"
            element={<CreateBook title="Create Book" btnText="Add Book" />}
          />
          <Route path="/showbooks" element={<ShowBooks />} />
          <Route path="/getbook/:id" element={<BookDetails />} />
          <Route
            path="updatebook/:id"
            element={<UpdateBook title="Update Book" btnText="Update Book" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
