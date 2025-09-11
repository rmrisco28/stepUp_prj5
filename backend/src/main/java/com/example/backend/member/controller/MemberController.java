package com.example.backend.member.controller;

import com.example.backend.member.dto.LoginRequest;
import com.example.backend.member.dto.LoginResponse;
import com.example.backend.member.entity.Member;
import com.example.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest,
                                               HttpServletRequest request) {
        Optional<Member> memberOpt = memberService.authenticateUser(
                loginRequest.getLoginId(),
                loginRequest.getPassword()
        );

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();

            // 세션에 사용자 정보 저장
            HttpSession session = request.getSession();
            session.setAttribute("memberSeq", member.getMemberSeq());
            session.setAttribute("loginId", member.getLoginId());

            LoginResponse.MemberInfo memberInfo = new LoginResponse.MemberInfo(
                    member.getMemberSeq(),
                    member.getLoginId()
            );

            LoginResponse response = new LoginResponse(
                    true,
                    "로그인 성공",
                    memberInfo
            );

            return ResponseEntity.ok(response);
        } else {
            LoginResponse response = new LoginResponse(
                    false,
                    "아이디 또는 비밀번호가 잘못되었습니다.",
                    null
            );
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        LoginResponse response = new LoginResponse(
                true,
                "로그아웃 성공",
                null
        );

        return ResponseEntity.ok(response);
    }

    // 현재 로그인 상태 확인
//    @GetMapping("/status")
//    public ResponseEntity<LoginResponse> getAuthStatus(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//
//        if (session != null && session.getAttribute("memberSeq") != null) {
//            Long memberSeq = (Long) session.getAttribute("memberSeq");
//            String loginId = (String) session.getAttribute("loginId");
//
//            LoginResponse.MemberInfo memberInfo = new LoginResponse.MemberInfo(
//                    memberSeq,
//                    loginId
//            );
//
//            LoginResponse response = new LoginResponse(
//                    true,
//                    "로그인 상태",
//                    memberInfo
//            );
//
//            return ResponseEntity.ok(response);
//        } else {
//            LoginResponse response = new LoginResponse(
//                    false,
//                    "로그인되지 않음",
//                    null
//            );
//            return ResponseEntity.ok(response);
//        }
//    }
}
