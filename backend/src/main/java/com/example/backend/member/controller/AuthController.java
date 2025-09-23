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
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.authenticate(
                loginRequest.getLoginId(),
                loginRequest.getPassword()
        );

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        authService.logout();
        return ResponseEntity.ok(new LoginResponse(true, "로그아웃 성공", null, null, null, null, null));
    }

    @GetMapping("/status")
    public ResponseEntity<LoginResponse> getAuthStatus() {
        LoginResponse response = authService.getCurrentUser();
        return ResponseEntity.ok(response);
    }
}
