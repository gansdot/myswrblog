import App from "next/app";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";
import { Container } from "react-bootstrap";
import fetch from "isomorphic-unfetch";
import Navigation from "../components/navbar";
import "../css/styles.css";

export default class MyApp extends App {
  layoutContainer = {
    width: "80%",
    paddingRight: "7%",
    paddingLeft: "7%",
    marginRight: "auto",
    marginLeft: "auto",
  };
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Navigation />
        <SWRConfig
          value={{
            fetcher: (url: string) => fetch(url).then((res) => res.json()),
          }}
        >
          <Container className="layoutContainer">
            <div style={{ height: "30px" }}></div>
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </React.Fragment>
    );
  }
}
