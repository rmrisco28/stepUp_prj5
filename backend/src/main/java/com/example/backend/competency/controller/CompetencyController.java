package com.example.backend.competency.controller;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.dto.SubCompetencyDto;
import com.example.backend.competency.dto.SubCompetencyListDto;
import com.example.backend.competency.service.CompetencyService;
import com.example.backend.competency.service.SubCompetencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/competency")
public class CompetencyController {
    private final CompetencyService competencyService;
    private final SubCompetencyService subCompetencyService;

    // 핵심역량 생성
    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody CompetencyDto dto) {
        competencyService.add(dto);
        System.out.println("dto = " + dto);
        return ResponseEntity.ok().body(Map.of("message", "역량이 추가되었습니다."));
    }

    // 핵심역량 목록
    @GetMapping("list")
    public List<?> list() {
        return competencyService.list();
    }

    // 핵심역량 사용여부 변경
    @PutMapping("update/{seq}")
    public ResponseEntity<?> updateCompetencyUseYn(@PathVariable int seq, @RequestBody CompetencyDto competencyDto) {

        return competencyService.update(seq, competencyDto);
    }

    // 하위역량 추가
    @PostMapping("subAdd")
    public ResponseEntity<?> subAdd(@RequestBody SubCompetencyDto dto) {
        System.out.println("dto = " + dto);
        subCompetencyService.subAdd(dto);
        return ResponseEntity.ok().body(Map.of("message", "하위역량이 추가되었습니다."));
    }

    // 하위역량, 핵심역량 선택지
    @GetMapping("subAddList")
    public List<?> subAddList() {
        return subCompetencyService.subAddList();
    }

    // 하위역량 목록
    @GetMapping("subList")
    public List<?> subList() {
        return subCompetencyService.subList();
    }

    // 하위역량 사용여부 변경
    @PutMapping("subUpdate/{seq}")
    public ResponseEntity<?> subUpdateCompetencyUseYn(@PathVariable int seq, @RequestBody SubCompetencyListDto subCompetencyListDto) {

        return subCompetencyService.subUpdate(seq, subCompetencyListDto);
    }

    // 핵심역량 소개
    @GetMapping("")
    public List<?> intro() {
        return subCompetencyService.intro();
    }


}
