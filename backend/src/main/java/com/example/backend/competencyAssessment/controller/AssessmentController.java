package com.example.backend.competencyAssessment.controller;

import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competencyAssessment.dto.ChoiceAddDto;
import com.example.backend.competencyAssessment.dto.QuestionAddDto;
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

/*
    // 역량 진단 삭제
    @DeleteMapping("delete/{seq}")
    public ResponseEntity<?> delete(@PathVariable int seq) {
        return assessmentService.delete(seq);
    }
*/

    /*~~~~~~~~~~~~~~~~~~~~~~~ 목록 세부 관리 ~~~~~~~~~~~~~~~~~~~~~~~*/

    // 진단 목록 세부 관리
    @GetMapping("admin/{seq}")
    public Map<String, Object> AdminList(@PathVariable int seq) {
        Object title = assessmentService.title(seq);
        Object questionList = assessmentService.questionList(seq);
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
        System.out.println("seq = " + seq);
        System.out.println("dto = " + dto);
        return assessmentService.questionAdd(seq, dto);
    }

    // 진단 답안 저장
    @PostMapping("admin/{seq}/choiceAdd")
    public ResponseEntity<?> choiceAdd(@PathVariable int seq, @RequestBody ChoiceAddDto dto) {
        System.out.println("seq = " + seq);
        System.out.println("dto = " + dto);
        return assessmentService.choiceAdd(seq, dto);
    }


}
