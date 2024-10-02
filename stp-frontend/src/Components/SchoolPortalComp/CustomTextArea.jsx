// src/components/CustomTextArea.jsx
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const CustomTextArea = ({ value, onChange }) => {
  return (
    <Editor
      apiKey="2k66p00ufe31mut5ctxu5s6cegpthu6kzc3pd0ap5fsswfst" // Your API key
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
        ],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullscreen | " +
          "forecolor backcolor emoticons | help",

        menubar: false,
      }}
      onEditorChange={onChange}
    />
  );
};

export default CustomTextArea;
