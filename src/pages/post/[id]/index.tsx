import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "react-avatar";
import Figure from "react-bootstrap/Figure";
import Link from "next/link";
import "../../../css/styles.css";
import useSWR from "swr";
import { Blog, PostProps } from "../../api/blogtype";

const url = "http://localhost:3000/api/";

const Index = () => {
  const router = useRouter();
  let { id } = router.query;

  console.log("this is id " + JSON.stringify(router.query));

  const { data, error } = useSWR(url + "blogs");

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error..{error}</div>;
  return <DisplayPost id={+id} blog={data} />;
};

const DisplayPost: React.FC<PostProps> = ({ id, blog }) => {
  console.log("in display " + id);

  let sb = id !== 0 ? blog?.filter((b) => b.id == id)[0] : blog?.[0];
  console.log(sb);
  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col md={8}>
            <Row className="blogheading">
              <span>{sb?.blogTitle}</span>
            </Row>
            <Row>
              <div style={{ textAlign: "right", margin: "8px 2px" }}>
                <Avatar facebookId="1570197833" size="60" round={true} />
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
              <img width={600} height={390} src={"/" + sb?.blogImage} />
            </Row>
            <Row>
              <div style={{ width: "96%" }}>
                <p className="cardText">{sb?.blogText}</p>
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <div style={{ height: "40px" }}></div>
            </Row>
            <Row>
              <div className="d-inline p-2 bg-dark text-white ">
                More from CodeGans
              </div>
            </Row>
            {blog?.map((b) => (
              <Row key={b.id}>
                <div className="sideBarHeading" key={b.id}>
                  <img
                    key={b.blogTitle}
                    style={{ float: "left" }}
                    className="img-fluid img-thumbnail"
                    src={"/" + b.blogImage}
                    width="66"
                    height="42"
                  />
                  <Link key={b.id} href="/post/[id]" as={`/post/${b.id}`}>
                    <a>{b.blogTitle}</a>
                  </Link>
                </div>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
