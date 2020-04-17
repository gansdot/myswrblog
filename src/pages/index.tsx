import React, { useEffect } from "react";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/styles.css";
import { Blog } from "./api/blogtype";
import HomeImage from "../components/homeimage";
import SideImage from "../components/sideimage";
import { NextPage } from "next";
import BlogSpinner from "../components/spinner";

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/blogs");

  useEffect(() => {});

  if (!data) return <BlogSpinner />;
  if (data?.length === 0)
    return (
      <div>
        <h2>No Data...</h2>
      </div>
    );
  if (error) return <div>Error..</div>;

  return <DisplayBlog blog={data} />;
};

function DisplayBlog({ blog }: { blog: Blog[] }) {
  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col xl={5} className="mainImageHeading">
            <HomeImage blog={blog[0]} />
          </Col>
          <Col xl={7}>
            <Container fluid={true}>
              <Row>
                <Col xl={6} className="text-left">
                  <SideImage blog={blog[1]} />
                </Col>
                <Col xl={6} className="text-left ">
                  <SideImage blog={blog[2]} />
                </Col>
              </Row>
              <Row>
                <Col xl={6} className="text-left">
                  <SideImage blog={blog[3]} />
                </Col>
                <Col xl={6} className="text-left">
                  <SideImage blog={blog[4]} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
