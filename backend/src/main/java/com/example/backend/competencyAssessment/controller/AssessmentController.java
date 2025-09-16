package com.example.backend.competencyAssessment.controller;

import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competencyAssessment.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/competency/assessment")

public class AssessmentController {
    private final AssessmentService assessmentService;

    // 역량 진단 목록 저장
    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody AssessmentDto dto) {
        assessmentService.add(dto);
        return ResponseEntity.ok().body(Map.of("message", "진단 목록이 생성되었습니다."));
    }

    // 역량 진단 목록
    @GetMapping("")
    public Map<String, Object> list(
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber) {
        return assessmentService.list(pageNumber);
    }

    // 역량 진단 삭제
    @DeleteMapping("delete/{seq}")
    public ResponseEntity<?> delete(@PathVariable int seq) {
        return assessmentService.delete(seq);
    }
}
