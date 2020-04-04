import React from "react";
import Figure from "react-bootstrap/Figure";
import { Blog } from "../pages/api/blogtype";

const HomeImage = ({ blog }: { blog: Blog }) => {
  return (
    <Figure>
      <Figure.Caption>{blog.blogTitle}</Figure.Caption>

      <Figure.Image
        width={340}
        height={230}
        alt="220x145"
        src={blog.blogImage}
      />
    </Figure>
  );
};

export default HomeImage;
