import React, { useState } from "react";

export function CompetencyTextEditor() {
  const [editorValue, setEditorValue] = useState("");

  // 이미지 파일을 base64로 변환하는 함수
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        insertImage(base64String); // 에디터에 이미지를 삽입하는 함수
      };
      reader.readAsDataURL(file);
    }
  };

  // 에디터에 이미지 삽입하기
  const insertImage = (imageData) => {
    const imgTag = `<img src="${imageData}" alt="image" />`;
    setEditorValue(editorValue + imgTag); // 이미지 태그를 editorValue에 추가
  };

  // 텍스트 영역에 대한 변경 처리
  const handleChange = (event) => {
    setEditorValue(event.target.value);
  };

  return (
    <div>
      <textarea
        value={editorValue}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="이미지를 삽입하고 텍스트를 작성하세요."
      />
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <h3>입력된 내용:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorValue }} />
      </div>
    </div>
  );
}
