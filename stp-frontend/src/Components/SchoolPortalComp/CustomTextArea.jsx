// src/components/CustomTextArea.jsx
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill theme

// Add custom size styles to Quill's registry
const Size = Quill.import("formats/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "24px", "32px"]; // Add pixel sizes to the whitelist
Quill.register(Size, true);

const CustomTextArea = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            // [
            //   {
            //     size: ["10px", "12px", "14px", "16px", "18px", "24px", "32px"],
            //   },
            // ],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ align: [] }],
            ["link", "image"],
            ["clean"], // remove formatting button
            ["code-block"],
          ],
        },
      }}
      formats={[
        "header",
        "font",
        "size", // Include 'size' for font size based on px
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "align",
        "link",
        "image",
        "code-block",
      ]}
      theme="snow" // Sets the Quill theme to "snow"
    />
  );
};

export default CustomTextArea;
