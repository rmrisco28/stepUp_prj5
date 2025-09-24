package com.example.backend.competencyAssessment.controller;

import com.example.backend.competencyAssessment.dto.*;
import com.example.backend.competencyAssessment.repository.ResultRepository;
import com.example.backend.competencyAssessment.service.AssessmentService;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/competency/assessment")

public class AssessmentController {
    private final AssessmentService assessmentService;
    private final ResultRepository resultRepository;

    /*----------------- 역량 진단 목록 ----------------*/
    // 역량 진단 목록 저장
    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody AssessmentDto dto) {
        return assessmentService.add(dto);
    }

    // 역량 진단 목록
    @GetMapping("")
    public Map<String, Object> list(
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber) {
        return assessmentService.list(pageNumber);
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~ 목록 세부 관리 ~~~~~~~~~~~~~~~~~~~~~~~*/

    // 진단 목록 세부 관리
    @GetMapping("admin/{seq}")
    public Map<String, Object> AdminList(
            @PathVariable int seq,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber) {
        Object title = assessmentService.title(seq);
        Object questionList = assessmentService.questionList(seq, pageNumber);
        Object totalScore = assessmentService.totalScore(seq);
        Map<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("questionList", questionList);
        map.put("totalScore", totalScore);
        return map;
    }

    // 진단 목록 수정 데이터 조회
    @GetMapping("admin/{seq}/edit")
    public ResponseEntity<?> edit(@PathVariable int seq) {
        return assessmentService.edit(seq);
    }

    // 진단 목록 수정 데이터 변경
    @PutMapping("admin/{seq}/edit")
    public ResponseEntity<?> update(@PathVariable int seq, @RequestBody AssessmentDto dto) {
        return assessmentService.update(seq, dto);
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~ 문제 ~~~~~~~~~~~~~~~~~~~~~~*/

    // 진단 문제 추가 시 핵심역량 목록 전달
    @GetMapping("admin/competency")
    public List<?> competencyList() {
        return assessmentService.competencyList();
    }

    // 진단 문제 추가 시 하위역량 목록 전달
    @GetMapping("admin/subCompetency")
    public List<?> subCompetencyList() {
        return assessmentService.subCompetencyList();
    }

    // 진단 문제 저장
    @PostMapping("admin/{seq}/questionAdd")
    public ResponseEntity<?> questionAdd(@PathVariable int seq, @RequestBody QuestionAddDto dto) {
        return assessmentService.questionAdd(seq, dto);
    }

    // 진단 답안 저장
    @PostMapping("admin/{seq}/choiceAdd")
    public ResponseEntity<?> choiceAdd(@PathVariable int seq, @RequestBody ChoiceAddDto dto) {
        return assessmentService.choiceAdd(seq, dto);
    }

    // 문제 수정을 위한 문제 데이터 전달
    @GetMapping("admin/{seq}/questionEdit/{num}")
    public QuestionListDto questionEdit(@PathVariable int seq, @PathVariable int num) {

        return assessmentService.questionDetail(seq, num);
    }

    // 문제 수정을 위한 선택지 데이터 전달
    @GetMapping("admin/{seq}/choiceEdit/{num}")
    public List<?> choiceEdit(@PathVariable int seq, @PathVariable int num) {

        return assessmentService.choiceDetail(seq, num);
    }

    // 문제 업데이트
    @PutMapping("admin/{seq}/questionUpdate/{num}")
    public ResponseEntity<?> questionUpdate(
            @PathVariable int seq, @PathVariable int num,
            @RequestBody QuestionAddDto dto) {
        return assessmentService.questionUpdate(seq, num, dto);
    }

    // 선택지 업데이트
    @PutMapping("admin/{seq}/choiceUpdate/{num}")
    public ResponseEntity<?> choiceUpdate(
            @PathVariable int num,
            @RequestBody ChoiceListDto dto) {
//        System.out.println("num = " + num);
//        System.out.println("dto = " + dto);
        return assessmentService.choiceUpdate(num, dto);
    }

    // 선택지 업데이트 + 삭제
    @DeleteMapping("admin/choiceDelete/{choiceSeq}")
    public ResponseEntity<?> deleteChoice(@PathVariable int choiceSeq) {
        return assessmentService.choiceDelete(choiceSeq);
    }

    /* --------------------- 테스트 ----------------------- */

    // 학생 진단검사 시작 전 초기화면
    @GetMapping("test/ready/{seq}")
    public AssessmentDto testReady(@PathVariable int seq) {

        return assessmentService.testReady(seq);

    }

    // 진단여부 확인
    @GetMapping("test/check/{seq}")
    public ResponseEntity<Boolean> testCheck(
            @PathVariable int seq,
            @RequestParam int memberSeq) {
        return assessmentService.testCheck(seq, memberSeq);
    }


    // 선택지 보내기
    @GetMapping("test/choiceList/{seq}")
    public List<?> choiceList(@PathVariable int seq) {
        return assessmentService.choiceList(seq);
    }

    // 응답 저장
    @PutMapping("test/responseSave/{seq}")
    public ResponseEntity<?> responseSave(@PathVariable int seq, @RequestBody List<ResponseDto> dtoList) {


        return assessmentService.responseSave(seq, dtoList);
    }

    /* ------------------진단 결과 -----------------------*/

    // 진단 완료 테이블
    @PostMapping("test/complete/{seq}")
    public ResponseEntity<?> complete(
            @PathVariable int seq,
            @RequestBody CompleteSaveDto dto) {
        return assessmentService.complete(seq, dto);
    }

    // 세부 결과 저장
    @PostMapping("test/resultSave/{seq}")
    public ResponseEntity<?> resultSave(
            @PathVariable int seq,
            @RequestBody List<ResponseDto> dtoList) {
        System.out.println("seq = " + seq);
        System.out.println("dtoList = " + dtoList);
        return assessmentService.resultSave(seq, dtoList);
    }

    // 세부 결과 저장 내용 전달
    @GetMapping("test/result/{seq}")
    public List<?> resultData(
            @PathVariable int seq,
            @RequestParam int memberSeq) {
        System.out.println("seq = " + seq);
        System.out.println("memberSeq = " + memberSeq);
        return assessmentService.result(seq, memberSeq);
    }

    // 세부 결과 계산을 위한 문제 정보 전달
    @GetMapping("test/resultQuestion/{seq}")
    public List<?> resultQuestion(@PathVariable int seq) {
        List<QuestionListDto> questionList = assessmentService.resultQuestionList(seq);
        System.out.println("questionList 문항 정보 = " + questionList);
        return questionList;
    }

    /*----------- 삭제 -----------------*/

    @DeleteMapping("admin/{seq}/{questionSeq}")
    public ResponseEntity<?> deleteQuestion(@PathVariable int seq,
                                            @PathVariable int questionSeq) {
        System.out.println("seq = " + seq);
        System.out.println("questionSeq = " + questionSeq);
        assessmentService.deleteQuestion(seq, questionSeq);
        return ResponseEntity.ok().body("삭제 완료");
    }

    @DeleteMapping("admin/{seq}")
    public ResponseEntity<?> deleteAssessment(@PathVariable int seq) {
        assessmentService.deleteAssessment(seq);
        return ResponseEntity.ok("Assessment deleted successfully");
    }
}
