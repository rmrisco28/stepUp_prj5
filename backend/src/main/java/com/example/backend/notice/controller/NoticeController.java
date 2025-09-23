package com.example.backend.notice.controller;

import com.example.backend.notice.dto.NoticeAddForm;
import com.example.backend.notice.dto.NoticeListInfo;
import com.example.backend.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

//    @GetMapping("/list")
//    public List<NoticeListInfo> getNoticeList() {
//        return noticeService.listNotice();
//    }

    @GetMapping("list")
    public Map<String, Object> getNoticeList(
            @RequestParam(value = "page", defaultValue = "1") Integer num) {
        return noticeService.listNotice(num);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoticeDetail(@PathVariable Integer id) {
        return ResponseEntity.ok().body(noticeService.getNoticeDetail(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Integer id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "공지사항이 삭제되었습니다.")
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Integer id, @ModelAttribute NoticeAddForm dto) {
        noticeService.updateNotice(id, dto);
        return ResponseEntity.ok(Map.of("message", Map.of("type", "success", "text", id + "번 게시물이 수정되었습니다.")));
    }
}
