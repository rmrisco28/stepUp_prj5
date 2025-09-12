package com.example.backend.member.repository;

import com.example.backend.member.entity.Member;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends Repository<Member, Integer> {
    // loginId가 있는 지 확인 -> 중복 처리 방지
    boolean existsByLoginId(String loginId);

    Optional<Member> findByLoginId(String loginId);

    Optional<Member> findByMemberSeq(Integer memberSeq);
}