import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function CompetencyEditor() {
  const MAX_COMPETENCIES = 5;
  const [competencies, setCompetencies] = useState([]);

  useEffect(() => {
    axios
      .get("/competency")
      .then((res) => {
        console.log("ok");
        setCompetencies(res.data);
      })
      .catch((err) => {
        console.log("error");
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  // 역량과 내용 상태 배열로 관리
  const [competency, setCompetency] = useState([
    { name: "", expln: "", file: "" },
  ]);

  // 역량 추가 핸들러
  const handleAddCompetency = () => {
    if (competency.length >= MAX_COMPETENCIES) {
      alert(`최대 ${MAX_COMPETENCIES}개의 역량만 추가할 수 있습니다.`);
      return; // 최대 개수 초과 시 추가하지 않음
    }

    const newCompetency = { name: "", expln: "" };
    setCompetency([...competency, newCompetency]);
  };

  // 각 역량에 대한 값 변경 핸들러
  const handleCompetencyChange = (index, field, value) => {
    const newCompetency = [...competency];
    newCompetency[index] = { ...newCompetency[index], [field]: value };
    setCompetency(newCompetency);
  };

  // `Create` (새 항목 추가)와 `Update` (수정된 항목 저장)를 동시에 처리하는 함수
  const handleSaveCompetencies = () => {
    const newCompetenciesToCreate = competency.filter(
      (competency) => !competency.id,
    ); // `id`가 없는 새로운 항목
    const updatedCompetencies = competency.filter(
      (competency) => competency.id,
    ); // `id`가 있는 수정된 항목들

    // 1. 새 항목 추가 (`POST` 요청)
    const createPromises = newCompetenciesToCreate.map(
      (competency) => axios.post("/api/competencies", competency), // 서버에 새로운 역량 추가
    );

    // 2. 기존 항목 수정 (`PUT` 요청)
    const updatePromises = updatedCompetencies.map(
      (competency) =>
        axios.put(`/api/competencies/${competency.id}`, competency), // 서버에 수정된 역량 업데이트
    );

    // `POST`와 `PUT` 요청들을 병렬로 처리
    Promise.all([...createPromises, ...updatePromises])
      .then((responses) => {
        console.log("All competencies saved:", responses);
      })
      .catch((error) => console.error("Error saving competencies:", error));
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={4}>
          <h2 className="mb-3">역량 변경</h2>
          {/* 역량 */}
          {competency.map((competency, index) => (
            <div key={index}>
              <FormGroup className="mb-3" controlId={`title${index}`}>
                <FormLabel style={{ fontSize: "1.5rem" }}>
                  {index + 1} 역량
                </FormLabel>
                <FormControl
                  value={competency.name}
                  onChange={(e) => {
                    handleCompetencyChange(index, "name", e.target.value);
                  }}
                />
              </FormGroup>

              {/* 역량 내용 */}
              <FormGroup className="mb-3" controlId={`expln${index}`}>
                <FormLabel>{index + 1} 역량내용</FormLabel>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={competency.expln}
                  onChange={(e) => {
                    handleCompetencyChange(index, "expln", e.target.value);
                  }}
                />
              </FormGroup>

              {/* 역량 이미지 */}
              <FormGroup className="mb-3" controlId={`file${index}`}>
                <FormLabel>{index + 1} 역량 설명 이미지(최대 3개)</FormLabel>
                <FormControl
                  type="file"
                  value={competency.file}
                  onChange={(e) => {
                    handleCompetencyChange(index, "file", e.target.value);
                  }}
                />
              </FormGroup>
              <hr />
            </div>
          ))}
          {/* 역량 추가 버튼 */}
          <div className="d-flex justify-content-end">
            <div className="me-2">
              <Button onClick={handleAddCompetency}>역량 추가</Button>
            </div>
            <div>
              <Button onClick={handleSaveCompetencies}>저장</Button>
            </div>
            {/* Create & Update 동시에 처리 */}
          </div>
        </Col>
      </Row>
    </>
  );
}
