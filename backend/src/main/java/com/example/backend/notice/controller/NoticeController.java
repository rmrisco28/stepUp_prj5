package com.example.backend.notice.controller;

import com.example.backend.notice.dto.NoticeAddForm;
import com.example.backend.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping("/add")
    public ResponseEntity<?> addNotice(@RequestBody NoticeAddForm dto) {
        noticeService.addNotice(dto);
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "공지사항이 추가되었습니다.")
                ));
    }
}
