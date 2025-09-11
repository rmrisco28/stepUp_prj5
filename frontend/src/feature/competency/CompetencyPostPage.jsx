import React, { useEffect, useState } from "react";
import { CompetencyPostEditor } from "./CompetencyPostEditor.jsx";
import axios from "axios";
import { Button } from "react-bootstrap";

export function CompetencyPostPage() {
  const [post, setPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // 페이지 로드 시 글 1개 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/latest")
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.log("글이 아직 없습니다.");
      });
  }, []);

  // 글 작성 후 저장되면 다시 보여줌
  const handlePostSaved = (newPost) => {
    setPost(newPost);
    setShowEditor(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ) : showEditor ? (
        <CompetencyPostEditor onPostSaved={handlePostSaved} />
      ) : (
        <Button onClick={() => setShowEditor(true)}>글 작성</Button>
      )}
    </div>
  );
}
