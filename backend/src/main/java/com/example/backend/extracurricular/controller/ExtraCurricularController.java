package com.example.backend.extracurricular.controller;

import com.example.backend.extracurricular.dto.ApplicationRequestDto;
import com.example.backend.extracurricular.dto.ETCAddForm;
import com.example.backend.extracurricular.dto.ETCApplyForm;
import com.example.backend.extracurricular.dto.ETCEditForm;
import com.example.backend.extracurricular.service.ExtraCurricularService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/extracurricular")
@RequiredArgsConstructor
public class ExtraCurricularController {

    private final ExtraCurricularService extraCurricularService;

    // 비교과 프로그램 등록(관리목록에 등록)
    @PostMapping("register")
    public ResponseEntity<?> register(ETCAddForm etcAddForm) {
        try {
            extraCurricularService.register(etcAddForm);
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

    // 프로그램 상세 보기(관리자)
    @GetMapping("detail/{seq}")
    public ResponseEntity<?> detail(@PathVariable Integer seq) {
        return ResponseEntity.ok().body(extraCurricularService.detail(seq));
    }

    // 프로그램 수정
    @PutMapping("edit/{seq}")
    public ResponseEntity<?> edit(@PathVariable Integer seq, ETCEditForm form) {
        try {
            extraCurricularService.edit(seq, form);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", seq + "번 프로그램이 수정되었습니다.")));
    }

    // 프로그램 삭제
    @DeleteMapping("delete/{seq}")
    public ResponseEntity<?> delete(@PathVariable Integer seq) {
        try {
            extraCurricularService.delete(seq);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", seq + "번 프로그램이 삭제되었습니다.")));
    }

    @GetMapping("/applicationList/{seq}")
    public ResponseEntity<?> AppList(@PathVariable Integer seq) {
        return ResponseEntity.ok().body(extraCurricularService.appList(seq));
    }

    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody ETCApplyForm dto) {
        extraCurricularService.apply(dto);
        return ResponseEntity.ok().body(Map.of("message", "신청완료"));
    }

}
