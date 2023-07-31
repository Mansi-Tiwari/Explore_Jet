import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectIsEmail);

  if (userEmail === "manutiwari0507@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Permission Denied.</h1>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn bg-gray-600 text-white">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectIsEmail);

  if (userEmail === "manutiwari0507@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
