import React from "react";
import Figure from "react-bootstrap/Figure";
import { Blog } from "../pages/api/blogtype";

const HomeImage = ({ blog }: { blog: Blog }) => {
  return (
    <Figure>
      <Figure.Image
        width={220}
        height={145}
        alt="220x145"
        src={blog === null ? "holder.js/220x145" : blog?.blogImage}
      />
      <Figure.Caption>{blog?.blogTitle}</Figure.Caption>
    </Figure>
  );
};

export default HomeImage;
