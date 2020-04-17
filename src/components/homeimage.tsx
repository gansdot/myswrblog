import React from "react";
import Figure from "react-bootstrap/Figure";
import { Blog } from "../pages/api/blogtype";

const HomeImage = ({ blog }: { blog: Blog }) => {
  return (
    <Figure>
      <Figure.Caption>{blog?.blogTitle}</Figure.Caption>

      <Figure.Image
        width={600}
        height={390}
        alt="220x145"
        className="img-fluid"
        src={blog?.blogImage}
      />
    </Figure>
  );
};

export default HomeImage;
