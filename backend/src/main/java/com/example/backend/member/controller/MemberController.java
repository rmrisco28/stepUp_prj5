package com.example.backend.member.controller;

import com.example.backend.member.dto.ChangePwForm;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PutMapping("changePw")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changePassword(@RequestBody ChangePwForm dto) {
//                                            ,Authentication authentication) {
//        if (!authentication.getName().equals(data.getEmail())) {
//            return ResponseEntity.status(403).build();
//        }

        try {
            memberService.changePw(dto);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.status(403).body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }

        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "암호가 변경되었습니다.")));
    }
}
