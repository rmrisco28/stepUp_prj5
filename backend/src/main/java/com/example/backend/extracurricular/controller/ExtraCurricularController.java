package com.example.backend.extracurricular.controller;

import com.example.backend.extracurricular.dto.ETCAddForm;
import com.example.backend.extracurricular.service.ExtraCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/extracurricular")
@RequiredArgsConstructor
public class ExtraCurricularController {

    private final ExtraCurricularService extraCurricularService;

    // 비교과 프로그램 등록(관리목록에 등록)
    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody ETCAddForm etcAddForm) {
        try {
            extraCurricularService.add(etcAddForm);
        } catch (Exception e) {
            // 콘솔에 예외 발생 정보 출력
            e.printStackTrace();
            // 예외 객체 e에서 오류 메시지 꺼냄
            String message = e.getMessage();
            // 예외 발생 시 상태 코드와 오류 메시지 출력
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error", "text", message)));
        }
        // 등록 완료 시 메시지 출력
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "프로그램 등록이 완료되었습니다.")));
    }

    // 프로그램 목록 보기(관리자, 검색+페이지네이션)
    @GetMapping("list")
    public Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "q", defaultValue = "") String keyword
    ) {
        return extraCurricularService.list(pageNumber, keyword);
    }
}
