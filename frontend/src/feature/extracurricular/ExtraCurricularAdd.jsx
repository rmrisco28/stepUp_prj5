import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Row,
} from "react-bootstrap";
import { useState } from "react";

export function ExtraCurricularAdd() {
  return (
    <Container className="mt-5 my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4 text-center">비교과 프로그램 등록</h2>
          <Form>
            {/* 프로그램 제목 */}
            <FormGroup className="mb-3">
              <FormLabel>제목</FormLabel>
              <FormControl type="text" name="title" required />
            </FormGroup>

            {/* 프로그램 내용 */}
            <FormGroup className="mb-3">
              <FormLabel>내용</FormLabel>
              <FormControl as="textarea" rows={4} name="content" />
            </FormGroup>

            {/* 운영기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>운영 시작일</FormLabel>
                  <FormControl type="date" name="operate_start_dt" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>운영 종료일</FormLabel>
                  <FormControl type="date" name="operate_end_dt" />
                </FormGroup>
              </Col>
            </Row>

            {/* 신청기간 */}
            <Row>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>신청 시작일</FormLabel>
                  <FormControl type="date" name="apply_start_dt" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mb-3">
                  <FormLabel>신청 종료일</FormLabel>
                  <FormControl type="date" name="apply_end_dt" />
                </FormGroup>
              </Col>
            </Row>

            {/* 역량 */}
            <FormGroup className="mb-3">
              <FormLabel>역량</FormLabel>
              <FormControl type="text" name="competency" />
            </FormGroup>

            {/* 장소 */}
            <FormGroup className="mb-3">
              <FormLabel>장소</FormLabel>
              <FormControl type="text" name="location" />
            </FormGroup>

            {/* 운영방식 */}
            <FormGroup className="mb-3">
              <FormLabel>운영방식</FormLabel>
              <div>
                <FormCheck
                  inline
                  type="radio"
                  label="대면"
                  name="operation_type"
                  value="대면"
                />
                <FormCheck
                  inline
                  type="radio"
                  label="비대면"
                  name="operation_type"
                  value="비대면"
                />
                <FormCheck
                  inline
                  type="radio"
                  label="혼합"
                  name="operation_type"
                  value="혼합"
                />
              </div>
            </FormGroup>

            {/*신청 대상 학년*/}
            <FormGroup className="mb-3">
              <FormLabel>신청 대상 학년</FormLabel>
              <div>
                {[1, 2, 3, 4].map((grade) => (
                  <FormCheck
                    key={grade}
                    inline
                    type="checkbox"
                    label={`${grade}학년`}
                    value={grade}
                  />
                ))}
              </div>
            </FormGroup>

            {/* 모집정원 */}
            <FormGroup className="mb-3">
              <FormLabel>모집 정원</FormLabel>
              <FormControl type="number" name="capacity" />
            </FormGroup>

            {/* 담당자 */}
            <FormGroup className="mb-3">
              <FormLabel>담당자 (담당부서,학과)</FormLabel>
              <FormControl type="text" />
            </FormGroup>
            {/* 담당자 연락처 */}
            <FormGroup className="mb-3">
              <FormLabel>담당자 전화번호</FormLabel>
              <FormControl type="text" name="manager_phone" />
            </FormGroup>

            {/* 신청자 */}
            <FormGroup className="mb-3">
              <FormLabel>신청부서(학과)</FormLabel>
              <FormControl type="text" />
            </FormGroup>

            {/* 마일리지 점수 */}
            <FormGroup className="mb-3">
              <FormLabel>마일리지 점수</FormLabel>
              <FormControl type="number" name="mileage_points" />
            </FormGroup>

            {/* 작성자 */}
            <FormGroup className="mb-3">
              <FormLabel>작성자</FormLabel>
              <FormControl type="text" />
            </FormGroup>

            {/* 등록, 취소 버튼*/}
            <div className="text-center">
              <Button type="submit" variant="primary" className="me-2">
                등록
              </Button>
              <Button type="button" variant="secondary">
                취소
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
