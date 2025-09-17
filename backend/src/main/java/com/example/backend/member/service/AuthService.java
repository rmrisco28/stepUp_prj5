package com.example.backend.member.service;

import com.example.backend.member.dto.LoginResponse;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final HttpSession httpSession;

    // 인증 로직을 통합하여 로그인 후 세션에 저장까지 처리
    public LoginResponse authenticate(String loginId, String password) {
        Optional<Member> memberOpt = memberRepository.findByLoginId(loginId);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (bCryptPasswordEncoder.matches(password, member.getPassword())) {
                String name = null;
                if (member.getStudent() != null) {
                    name = member.getStudent().getName();
                } else if (member.getEmployee() != null) {
                    name = member.getEmployee().getName();
                } else {
                    name = "알 수 없음"; // 나중에 관리자도 추가하기
                }
                // 로그인 성공 시 세션에 정보 저장
                httpSession.setAttribute("memberSeq", member.getId());
                httpSession.setAttribute("loginId", member.getLoginId());
                httpSession.setAttribute("name", name);

                // LoginResponse 객체를 직접 생성하여 반환
                return new LoginResponse(true, "로그인 성공", member.getId(), member.getLoginId(), name);
            }
        }
        // 로그인 실패 시 실패 응답 생성
        return new LoginResponse(false, "아이디 또는 비밀번호가 잘못되었습니다.", null, null, null);
    }

    public void logout() {
        httpSession.invalidate();
    }

    public LoginResponse getCurrentUser() {
        Integer memberSeq = (Integer) httpSession.getAttribute("memberSeq");
        String loginId = (String) httpSession.getAttribute("loginId");
        String name = (String) httpSession.getAttribute("name");

        if (memberSeq != null) {
            return new LoginResponse(true, "로그인 상태", memberSeq, loginId, name);
        } else {
            return new LoginResponse(false, "로그인되지 않음", null, null, null);
        }
    }
}
