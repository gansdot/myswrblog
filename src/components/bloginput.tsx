import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { BlogProps } from "../pages/api/blogtype";
import React, { useState, ChangeEvent } from "react";

const BlogInput: React.FC<BlogProps> = ({
  title,
  value,
  required,
  handleChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [controlType, setControlType] = useState("file");

  const chooseFileControl = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    setControlType(!isChecked ? "text" : "file");

    console.log(e.target);
  };

  return (
    <div>
      {title !== "Image" ? (
        <InputGroup className="mb-4" id={title}>
          <InputGroup.Prepend>
            <InputGroup.Text
              id="basic-addon1"
              className="text-right"
              style={{ width: "100px" }}
            >
              {title}
            </InputGroup.Text>
          </InputGroup.Prepend>
          {title !== "Description" ? (
            <FormControl
              placeholder={`fill the ${title}`}
              aria-label="small"
              aria-describedby="basic-addon1"
              name={title}
              onChange={handleChange}
              value={value}
              required={required}
            />
          ) : (
            <FormControl
              placeholder={`fill the ${title}`}
              as="textarea"
              aria-label="small"
              aria-describedby="basic-addon1"
              name={title}
              onChange={handleChange}
              value={value}
              required={required}
            />
          )}
        </InputGroup>
      ) : (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ width: "100px", textAlign: "right" }}
            >
              Image
              <div style={{ width: "80%", marginBottom: "1px" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  aria-label="Checkbox for following text input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    chooseFileControl(e)
                  }
                />
              </div>
            </span>
          </div>
          <div className="custom-file">
            <input
              type={controlType}
              className="custom-file-input"
              onChange={handleChange}
              id="blogImage"
            />

            <label className="custom-file-label" htmlFor="blogImage">
              {!value
                ? "For higher resolution, select Image checkbox and paste the file path here."
                : value}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogInput;
