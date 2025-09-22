package com.example.backend.faq.controller;

import com.example.backend.faq.dto.FaqAddForm;
import com.example.backend.faq.dto.FaqListInfo;
import com.example.backend.faq.service.FaqService;
import com.example.backend.notice.dto.NoticeAddForm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faq")
public class FaqController {

    private final FaqService faqService;


    // FAQ 등록
    @PostMapping("add")
    public ResponseEntity<?> faqAdd(@RequestBody FaqAddForm dto) {
        faqService.faqAdd(dto);
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "FAQ가 추가되었습니다.")
                ));
    }

    // FAQ 목록
    @GetMapping("list")
    public List<FaqListInfo> List() {
        return faqService.list();
    }

    // FAQ 관리 목록
    @GetMapping("manage")
    public List<FaqListInfo> Manage() {
        return faqService.manageList();
    }

    // FAQ 상세보기
    @GetMapping("{seq}")
    public ResponseEntity<?> Detail(@PathVariable Integer seq) {
        return ResponseEntity.ok().body(faqService.Detail(seq));
    }

    // FAQ 수정
    @PutMapping("edit/{seq}")
    public ResponseEntity<?> edit(@PathVariable Integer seq, @ModelAttribute FaqAddForm dto) {
        faqService.edit(seq, dto);
        return ResponseEntity.ok(Map.of(
                "message", Map.of(
                        "type", "success", "text", seq + "번 게시물이 수정되었습니다.")));
    }

    // FAQ 삭제
    @DeleteMapping("delete/{seq}")
    public ResponseEntity<?> delete(@PathVariable Integer seq) {
        faqService.delete(seq);
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "FAQ가 삭제되었습니다.")
                ));
    }


}
