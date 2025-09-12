package com.example.backend.member.controller;

import com.example.backend.member.dto.LoginRequest;
import com.example.backend.member.dto.LoginResponse;
import com.example.backend.member.entity.Member;
import com.example.backend.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth") // URL 경로 변경
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        Optional<Member> memberOpt = authService.authenticate(
                loginRequest.getLoginId(),
                loginRequest.getPassword()
        );

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            LoginResponse.MemberInfo memberInfo = new LoginResponse.MemberInfo(
                    member.getMemberSeq(),
                    member.getLoginId()
            );
            return ResponseEntity.ok(new LoginResponse(true, "로그인 성공", memberInfo));
        } else {
            return ResponseEntity.badRequest().body(new LoginResponse(false, "아이디 또는 비밀번호가 잘못되었습니다.", null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        authService.logout();
        return ResponseEntity.ok(new LoginResponse(true, "로그아웃 성공", null));
    }

    @GetMapping("/status")
    public ResponseEntity<LoginResponse> getAuthStatus() {
        Optional<Member> memberOpt = authService.getCurrentUser();
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            LoginResponse.MemberInfo memberInfo = new LoginResponse.MemberInfo(
                    member.getMemberSeq(),
                    member.getLoginId()
            );
            return ResponseEntity.ok(new LoginResponse(true, "로그인 상태", memberInfo));
        } else {
            return ResponseEntity.ok(new LoginResponse(false, "로그인되지 않음", null));
        }
    }
}
