import React from "react";
import { Blog } from "../pages/api/blogtype";

const BlogCard = ({ blogc }: { blogc: Blog }) => {
  return (
    <div className="card" style={{ width: "12rem" }}>
      <img
        className="card-img-top"
        src={blogc?.blogImage}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{blogc?.blogTitle}</h5>
        <p className="card-text">{blogc?.blogCategory}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
