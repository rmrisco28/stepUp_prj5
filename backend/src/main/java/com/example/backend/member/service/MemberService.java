package com.example.backend.member.service;

import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private BCryptPasswordEncoder passwordEncoder;

    // 로그인 검증
    public Optional<Member> authenticateUser(String loginId, String password) {
        Optional<Member> memberOpt = memberRepository.findByLoginId(loginId);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (passwordEncoder.matches(password, member.getPassword())) {
                return Optional.of(member);
            }
        }
        return Optional.empty();
    }
}
