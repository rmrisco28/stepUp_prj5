import {
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export function CompetencyAssessmentTestStart() {
  const [title, setTitle] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const { assessmentSeq } = useParams();

  useEffect(() => {
    // 문제 받아오기
    axios
      .get(`/api/competency/assessment/admin/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title[0].caTitle);

        setQuestionList(res.data.questionList.questionList);
      });
    // 답 받아오기
    axios
      .get(`/api/competency/assessment/test/choiceList/${assessmentSeq}`)
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3>{title}</h3>
          <hr />
        </Col>
        <Col xs={10} md={8} lg={6}>
          {/*문제*/}
          {questionList.map((item, index) => (
            <div key={index}>
              {/*문제*/}
              <FormGroup className="mb-3" controlId="question">
                <FormLabel style={{ fontSize: "1.5rem" }}>
                  {item.question}
                </FormLabel>
              </FormGroup>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
}
