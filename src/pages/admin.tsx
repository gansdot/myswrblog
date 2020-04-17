import React, { useState, useEffect, MouseEvent } from "react";
import fetch from "isomorphic-unfetch";
import useSWR, { mutate } from "swr";
import { Blog, Status } from "../pages/api/blogtype";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BlogInput from "../components/bloginput";
import BlogEditor from "../components/blogeditor";
import { NextPage } from "next";
import Alert from "react-bootstrap/Alert";

const Admin: NextPage = () => {
  //const url = "http://localhost:3000/api/";
  const { data } = useSWR("/api/blogs");
  const [blog, setBlog] = useState<Blog>();
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const filemsg =
    "For higher resolution, select Image checkbox and paste the file path here.";

  const blogTitle = useFormInput("", "Title", true);
  const blogCategory = useFormInput("", "Category", true);
  const author = useFormInput("", "Author", true);
  const image = useFormInput("", "Image", true);
  //const blogText = useFormInput("", "Description", true);
  const slug = useFormInput("", "Tag", false);
  const [message, setMessage] = useState<Status>({
    style: "primary",
    message: "",
    status: "",
  });
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);

  const persistBlog = async () => {
    try {
      const response = await fetch("/api/upload", {
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
          blogText: content,
          image: image.value,
          isBinary: false,
        }),
      });
      //mutate(url);
      const raw = await response.json();
      setShow(true);
      setMessage(raw);
      setDisable(false);
      console.log("Response " + JSON.stringify(raw, null, 2));
    } catch (error) {
      console.log("Client error " + error);
    }
  };

  function onEditorChange(value: string) {
    console.log("this is html string --> " + value);
    setContent(value);
  }

  function handleSubmit(event: MouseEvent<HTMLButtonElement> | undefined) {
    console.log("hello event 1 " + image.value.length);
    console.log("hello event 2 " + filemsg);
    if (
      image.value.length !== 0 &&
      blogTitle.value.length !== 0 &&
      //blogText.value.length !== 0 &&
      author.value.length !== 0
    ) {
      setDisable(true);
      setShow(true);
      setMessage({
        style: "warning",
        status: "being processed....",
        message: "please wait....",
      });
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
        <>
          <Alert show={show} variant={message.style}>
            <Alert.Heading>Your blog {message.status}</Alert.Heading>
            <Row>
              <Col>
                <p>{message.message}</p>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <Button
                    size="sm"
                    onClick={() => {
                      setShow(false);
                    }}
                    variant={message.style}
                  >
                    Close
                  </Button>
                </div>
              </Col>
            </Row>
          </Alert>
        </>

        <Form noValidate validated={validated}>
          <BlogInput {...blogCategory} />
          <BlogInput {...blogTitle} />
          <BlogInput {...author} />
          {/* <BlogInput {...slug} /> */}
          <BlogInput {...image} />
          {/* <BlogInput {...blogText} /> */}
          <BlogEditor onEditorChange={onEditorChange} />

          <Button
            disabled={disable}
            className="btn btn-secondary btn-block"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleSubmit(e)
            }
          >
            Save Blog
          </Button>
        </Form>
      </Container>
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
