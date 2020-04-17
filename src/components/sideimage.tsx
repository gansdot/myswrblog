import React from "react";
import Figure from "react-bootstrap/Figure";
import { Blog } from "../pages/api/blogtype";

const HomeImage = ({ blog }: { blog: Blog }) => {
  return (
    <Figure className="mb-0 p-0">
      <Figure.Image
        width={220}
        height={145}
        alt="220x145"
        className="img-fluid"
        src={blog === null ? "holder.js/220x145" : blog?.blogImage}
      />
      <Figure.Caption className="mt-0">
        {blog?.blogTitle?.substring(0, 25)}...
      </Figure.Caption>
    </Figure>
  );
};

export default HomeImage;
