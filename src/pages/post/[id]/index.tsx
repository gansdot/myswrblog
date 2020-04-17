import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "react-avatar";
import Link from "next/link";
import "../../../css/styles.css";
import useSWR from "swr";
import { Blog, PostProps } from "../../api/blogtype";
import Moment from "moment";
import BlogSpinner from "../../../components/spinner";

const Index = () => {
  const router = useRouter();
  let { id } = router.query;
  let content = { __html: {} };

  const { data, error } = useSWR("/api/blogs");
  console.log("data " + data);
  if (!data) return <BlogSpinner />;

  if (error) return <div>Error..{error}</div>;
  return <DisplayPost id={+id} blog={data} />;
};

const DisplayPost: FC<PostProps> = ({ id, blog }) => {
  console.log("in display " + id);
  function createMarkup(value: string) {
    return { __html: value };
  }
  let sb = id !== 0 ? blog?.filter((b) => b.id == id)[0] : blog?.[0];
  console.log(sb);
  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col md={8}>
            <Row className="blogheading">
              <span>{sb?.blogTitle.substring(0, 50)}</span>
            </Row>
            <Row>
              <div style={{ textAlign: "right", margin: "8px 2px" }}>
                <Avatar facebookId="1570197833" size="50" round={true} />
              </div>
              <Col sm={10}>
                <Row>
                  <div className="blogBy">by {sb?.author}</div>
                </Row>
                <Row>
                  <div className="bydate">{sb?.postedOn}</div>
                </Row>
              </Col>
            </Row>
            <Row>
              <img
                width={600}
                height={390}
                src={"/" + sb?.blogImage}
                className="img-fluid"
              />
            </Row>
            <Row>
              <div
                style={{
                  width: "96%",
                  height: 150,
                  overflowY: "visible",
                  marginTop: 10,
                }}
              >
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    sb?.blogText ? sb.blogText : ""
                  )}
                />
              </div>
            </Row>
          </Col>
          {/* <Col md={1} /> */}
          <Col md={4}>
            <Row>
              <div style={{ height: "60px" }}></div>
            </Row>
            <Row>
              <div style={{ paddingLeft: "34px", paddingBottom: "20px" }}>
                <span className="d-block pl-5 pr-5 bg-dark text-white">
                  More from <br></br> CodeGans
                </span>
              </div>
            </Row>

            <Row>
              <div className="main">
                {blog?.map((b, index) => (
                  <div className="sideBarHeading" key={b.id}>
                    <img
                      //key={index}
                      src={"/" + b.blogImage}
                      width="60px"
                      height="40px"
                    />

                    <div>
                      <Link
                        key={b.blogImage}
                        href="/post/[id]"
                        as={`/post/${b.id}`}
                      >
                        <a>{b.blogTitle.substring(0, 15)}</a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Row>

            {/* {blog?.map((b) => (
              <Row key={b.id} className="border border-primary">
                <div className="sideBarHeading" key={b.id}>
                  <img
                    key={b.blogTitle}
                    //style={{ float: "left" }}
                    className="img-fluid img-thumbnail"
                    src={"/" + b.blogImage}
                    width="66"
                    height="42"
                  />
                  <Link key={b.id} href="/post/[id]" as={`/post/${b.id}`}>
                    <a className="moreLink">
                      {b.blogTitle.substring(0, 25)}...
                    </a>
                  </Link>
                </div>
              </Row>
            ))} */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
