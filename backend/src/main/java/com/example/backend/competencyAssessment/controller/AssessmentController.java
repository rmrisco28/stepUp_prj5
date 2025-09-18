package com.example.backend.competencyAssessment.controller;

import com.example.backend.competencyAssessment.dto.*;
import com.example.backend.competencyAssessment.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/competency/assessment")

public class AssessmentController {
    private final AssessmentService assessmentService;

    /*----------------- 역량 진단 목록 ----------------*/
    // 역량 진단 목록 저장
    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody AssessmentDto dto) {
        return assessmentService.add(dto);
    }

    // 역량 진단 목록
    @GetMapping("")
    public Map<String, Object> list(
            @RequestParam(defaultValue = "1") Integer pageNumber) {
        return assessmentService.list(pageNumber);
    }


    /*~~~~~~~~~~~~~~~~~~~~~~~ 목록 세부 관리 ~~~~~~~~~~~~~~~~~~~~~~~*/

    // 진단 목록 세부 관리
    @GetMapping("admin/{seq}")
    public Map<String, Object> AdminList(
            @PathVariable int seq,
            @RequestParam(defaultValue = "1") Integer pageNumber) {
        Object title = assessmentService.title(seq);
        Object questionList = assessmentService.questionList(seq, pageNumber);
        Map<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("questionList", questionList);
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
        System.out.println("num = " + num);
        System.out.println("dto = " + dto);
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

    // 위의     " // 진단 목록 세부 관리 "로 문제 가져감

    // 선택지 보내기
    @GetMapping("test/choiceList/{seq}")
    public List<?> choiceList(@PathVariable int seq) {
        System.out.println("seq = " + seq);
        return assessmentService.choiceList(seq);
    }


}
