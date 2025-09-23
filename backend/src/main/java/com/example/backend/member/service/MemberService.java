package com.example.backend.member.service;

import com.example.backend.batch.student.entity.Student;
import com.example.backend.batch.student.repository.StudentRepository;
import com.example.backend.member.dto.ChangePwForm;
import com.example.backend.member.dto.StudentInfoDto;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
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

    public void changePw(ChangePwForm form) {
        Member member = memberRepository.findById(form.getMemberSeq())
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));

        // 기존 비밀번호가 일치하는지 확인
        if (!bCryptPasswordEncoder.matches(form.getOldPassword(), member.getPassword())) {
            throw new RuntimeException("이전 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호 암호화 후 저장
        member.setPassword(bCryptPasswordEncoder.encode(form.getNewPassword().trim()));
        // 비밀번호 변경 카운팅, 일시 업데이트
        member.setChangePwCnt(member.getChangePwCnt() + 1);
        member.setChangePwAt(LocalDateTime.now());
        memberRepository.save(member);
    }

}
