package com.example.backend.member.controller;

import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    // 기본 crud만 작성

    @GetMapping("/studentInfo/{seq}")
    public ResponseEntity<?> getStudentInfo(@PathVariable("seq") Integer seq) {
        return ResponseEntity.ok(memberService.getStudentInfo(seq));
    }
}
