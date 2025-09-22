package com.example.backend.member.service;

import com.example.backend.batch.student.entity.Student;
import com.example.backend.batch.student.repository.StudentRepository;
import com.example.backend.member.dto.StudentInfoDto;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;
    // 기본 crud만 작성

    public StudentInfoDto getStudentInfo(Integer seq) {
        Member mb = memberRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다."));

        Student std = studentRepository.findByMemberSeq(mb)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 학생입니다."));

        return StudentInfoDto.builder()
                .phone(std.getPhone())
                .build();
    }
}
