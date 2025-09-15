package com.example.backend.member.service;

import com.example.backend.batch.student.repository.StudentRepository;
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
    public Optional<Member> authenticate(String loginId, String password) {
        Optional<Member> memberOpt = memberRepository.findByLoginId(loginId);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (bCryptPasswordEncoder.matches(password, member.getPassword())) {
                // 로그인 성공 시 세션에 정보 저장
                httpSession.setAttribute("memberSeq", member.getId());
                httpSession.setAttribute("loginId", member.getLoginId());
                // TODO 유민 : member랑 student 랑 참조 맺어서 필요한 정보 가져오기
//                httpSession.setAttribute("name", member.getMemberSeq().getName());
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
            return memberRepository.findById(memberSeq); // 세션 정보로 DB에서 회원 조회
        }
        return Optional.empty();
    }
}
