package com.example.backend.board.controller;

import com.example.backend.board.dto.NoticeAddForm;
import com.example.backend.board.entity.Notice;
import com.example.backend.board.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board/notice")
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
