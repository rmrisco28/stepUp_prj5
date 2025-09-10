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
            <FormGroup className="mb-3">
              <FormLabel>제목</FormLabel>
              <FormControl type="text" name="title" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>내용</FormLabel>
              <FormControl as="textarea" rows={4} name="content" />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>카테고리</FormLabel>
              <FormSelect name="category">
                <option>선택하세요</option>
                <option>특강</option>
                <option>봉사</option>
                <option>경진대회</option>
              </FormSelect>
            </FormGroup>

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

            <FormGroup className="mb-3">
              <FormLabel>장소</FormLabel>
              <FormControl type="text" name="location" />
            </FormGroup>

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

            <FormGroup className="mb-3">
              <FormLabel>신청 가능 학년</FormLabel>
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

            <FormGroup className="mb-3">
              <FormLabel>정원</FormLabel>
              <FormControl type="number" name="capacity" />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>담당자</FormLabel>
              <FormControl type="text" />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>담당자 전화번호</FormLabel>
              <FormControl type="text" name="manager_phone" />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>마일리지</FormLabel>
              <FormControl type="number" name="mileage_points" />
            </FormGroup>

            {/* 썸네일 */}
            <FormGroup className="mb-3">
              <FormLabel>썸네일 이미지</FormLabel>
              <FormControl type="file" accept="image/*" />
            </FormGroup>

            {/* 본문 이미지 */}
            <FormGroup className="mb-3">
              <FormLabel>본문 이미지</FormLabel>
              <FormControl type="file" multiple accept="image/*" />
              <FormText className="text-muted">
                여러 장 선택 가능 (Ctrl/Shift로 선택)
              </FormText>
            </FormGroup>

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
