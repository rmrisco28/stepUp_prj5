// src/components/PostEditor.jsx
import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";

export function CompetencyPostEditor({ onPostSaved }) {
  const titleRef = useRef();
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const title = titleRef.current.value;

    try {
      const response = await axios.post("http://localhost:8080/api/posts", {
        title,
        content,
        author: "익명",
      });

      if (onPostSaved) onPostSaved(response.data);
    } catch (error) {
      console.error("글 저장 실패:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        ref={titleRef}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: "300px", marginBottom: "20px" }}
      />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}
