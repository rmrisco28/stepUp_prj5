package com.example.backend.member.repository;

import com.example.backend.member.entity.Member;
import org.springframework.data.repository.Repository;

public interface MemberRepository extends Repository<Member, Integer> {
}