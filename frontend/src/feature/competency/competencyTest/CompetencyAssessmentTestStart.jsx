import {
  Col,
  Container,
  FormCheck,
  FormControl,
  FormFloating,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import FormRange from "react-bootstrap/FormRange";
import FormCheckInput from "react-bootstrap/FormCheckInput";

export function CompetencyAssessmentTestStart() {
  const [title, setTitle] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [choiceList, setChoiceList] = useState([]);

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
        setChoiceList(res.data);
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
            <div key={index} className="mb-5">
              {/*문제*/}
              <FormGroup className="mb-3" controlId="question">
                <FormLabel style={{ fontSize: "1.5rem" }}>
                  {item.questionNum}. {item.question}
                </FormLabel>
              </FormGroup>

              {choiceList.map(
                (choice, index) =>
                  item.seq === choice.questionSeqSeq && (
                    <FormGroup key={index} className="mb-3" controlId="choice">
                      <FormCheck
                        type="radio"
                        id={`choice-${item.seq}-${index}`}
                        className="mb-3"
                      >
                        <FormCheckInput
                          type="radio"
                          name={`question-${item.seq}`}
                          value={choice.seq}
                        ></FormCheckInput>
                        <FormCheck.Label>{choice.option}</FormCheck.Label>
                      </FormCheck>
                    </FormGroup>
                  ),
              )}
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
}
