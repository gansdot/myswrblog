import React, { useState, createRef } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { BlogEditorProps, BlogEditorState } from "../pages/api/blogtype";

class BlogEditor extends React.Component<BlogEditorProps, BlogEditorState> {
  //state: { editorHtml: string };

  placeholder: any;
  onEditorChange: any;
  quill: any;
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.apiPostNewsImage = this.apiPostNewsImage.bind(this);
  }

  handleChange(html: any) {
    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  }

  apiPostNewsImage(formData: FormData) {
    console.log("image gonna save here");
    // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
  }

  imageHandler() {
    const input: HTMLInputElement = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = `input.files[0]`;
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      // Insert temporary loading placeholder image
      this.quill.insertEmbed(
        range.index,
        "image",
        `${window.location.origin}/images/loaders/placeholder.gif`
      );

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);

      const res = await this.apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      // Remove placeholder image
      this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, "image", res);
    };
  }
  formats: string[] = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
  ];
  modules: any = {
    toolbar: {
      container: [
        [
          { header: "1" },
          { header: "2" },
          { header: [3, 4, 5, 6] },
          { font: [] },
        ],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        // ["link", "image", "video"],
        ["link", "video"],
        ["code-block"],
        ["clean"],
      ],
      // handlers: {
      //   image: this.imageHandler,
      // },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    },
  };
  render() {
    return (
      <div className="text-editor">
        {/* {JSON.stringify(this.state.editorHtml)}
        <hr /> */}
        <ReactQuill
          //   ref={(el) => {
          //     this.quill = el;
          //   }}
          onChange={this.handleChange}
          placeholder={"here you go with your content"}
          modules={this.modules}
          formats={this.formats}
        />
      </div>
    );
  }
}

export default BlogEditor;
