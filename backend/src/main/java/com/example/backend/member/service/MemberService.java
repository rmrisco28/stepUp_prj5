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

    // 회원을 찾아 반환하는 메서드만 남김
    public Optional<Member> findByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId);
    }
}
