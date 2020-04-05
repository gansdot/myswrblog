import React, { useState, useEffect, MouseEvent } from "react";
import Alert from "react-bootstrap/Alert";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import { Blog } from "../pages/api/blogtype";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlogInput from "../components/bloginput";

const Admin = () => {
  const url = "http://localhost:3000/api/";
  const { data } = useSWR(url + "blogs");
  const [blog, setBlog] = useState<Blog>();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const filemsg =
    "For higher resolution, select Image checkbox and paste the file path here.";
  const blogTitle = useFormInput("", "Title", true);
  const blogCategory = useFormInput("", "Category", true);
  const author = useFormInput("", "Author", true);
  const image = useFormInput("", "Image", true);
  const blogText = useFormInput("", "Description", true);
  const slug = useFormInput("", "Tag", false);

  const [variant, setVariant] = useState("success");

  const persistBlog = async () => {
    try {
      const response = await fetch(url + "upload", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          type: "formData",
        },
        body: JSON.stringify({
          ...blog,
          blogImage: image.value,
          blogTitle: blogTitle.value,
          author: author.value,
          slug: slug.value,
          blogCategory: blogCategory.value,
          blogText: blogText.value,
          image: image.value,
          isBinary: false,
        }),
      });
      //mutate(url);
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(event: MouseEvent<HTMLButtonElement> | undefined) {
    console.log("hello event 1 " + image.value.length);
    console.log("hello event 2 " + filemsg);
    if (
      image.value.length !== 0 &&
      blogTitle.value.length !== 0 &&
      blogText.value.length !== 0 &&
      author.value.length !== 0
    ) {
      setValidated(false);
      persistBlog();
    } else {
      setValidated(true);
      event?.preventDefault();
      event?.stopPropagation();
    }
  }

  return (
    <>
      <h3 style={{ paddingLeft: "15px" }}>Blog Writing Administrator</h3>
      <Container className="p-3" fluid={true}>
        <Form noValidate validated={validated}>
          <BlogInput {...blogCategory} />
          <BlogInput {...blogTitle} />
          <BlogInput {...author} />
          <BlogInput {...slug} />
          <BlogInput {...image} />
          <BlogInput {...blogText} />
          <Button
            className="btn-block"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
          >
            Save Blog
          </Button>

          {/* 
          {!show && (
           
          )} */}
        </Form>
      </Container>

      <Alert show={show} className={variant}>
        <Alert.Heading>Your blog data</Alert.Heading>
        <Row>
          <Col>
            <p> {""}</p>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  //setShow(false);
                  //   setBlog({
                  //     id: "",
                  //     blogCategory: "",
                  //     blogTitle: "",
                  //     slug: "",
                  //     postedOn: "",
                  //     author: "",
                  //     blogImage: "",
                  //     blogText: "",
                  //   });
                }}
                variant="outline-success"
              >
                Close me
              </Button>
            </div>
          </Col>
        </Row>
      </Alert>
    </>
  );
};

function useFormInput(initialValue: string, title: string, required: boolean) {
  const [value, setValue] = useState<string>(initialValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return {
    title,
    value,
    required,
    handleChange,
  };
}

export default Admin;
