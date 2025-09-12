package com.example.backend.member.service;

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
    private final MemberRepository memberRepository; // MemberService를 통하지 않고 직접 Repository 사용
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final HttpSession httpSession;

    // 인증 로직을 통합하여 로그인 후 세션에 저장까지 처리
    public Optional<Member> authenticate(String loginId, String password) {
        Optional<Member> memberOpt = memberRepository.findByLoginId(loginId);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (bCryptPasswordEncoder.matches(password, member.getPassword())) {
                // 로그인 성공 시 세션에 정보 저장
                httpSession.setAttribute("memberSeq", member.getMemberSeq());
                httpSession.setAttribute("loginId", member.getLoginId());
                return Optional.of(member);
            }
        }
        return Optional.empty();
    }

    public void logout() {
        httpSession.invalidate();
    }

    public Optional<Member> getCurrentUser() {
        Integer memberSeq = (Integer) httpSession.getAttribute("memberSeq");
        if (memberSeq != null) {
            return memberRepository.findByMemberSeq(memberSeq); // 세션 정보로 DB에서 회원 조회
        }
        return Optional.empty();
    }
}
