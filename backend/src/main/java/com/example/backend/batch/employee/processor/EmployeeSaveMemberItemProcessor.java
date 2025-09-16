package com.example.backend.batch.employee.processor;

import com.example.backend.member.dto.MemberSaveDto;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmployeeSaveMemberItemProcessor implements ItemProcessor<MemberSaveDto, Member> {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member process(MemberSaveDto item) throws Exception {
        log.debug("Processing employee for member creation with loginId: {}", item.getLoginId());

        // 1. 중복 체크: 이미 존재하는 회원이면 null을 반환하여 writer로 넘어가지 않도록 함
        if (memberRepository.existsByLoginId(item.getLoginId())) {
            log.warn("Member with loginId {} already exists, skipping.", item.getLoginId());
            return null;
        }

        // 2. 비밀번호 가공: rawPassword를 YYMMDD로 변환 후 BCrypt로 암호화
        String birthDateStr = item.getRawPassword();
        LocalDate birthDate = LocalDate.parse(birthDateStr, DateTimeFormatter.ISO_LOCAL_DATE);
        String rawPassword = birthDate.format(DateTimeFormatter.ofPattern("yyMMdd"));
        String encryptedPassword = passwordEncoder.encode(rawPassword);

        // 3. Member 엔티티 생성
        Member member = new Member();
        member.setLoginId(item.getLoginId());
        member.setPassword(encryptedPassword);

        log.debug("Generated member entity with encrypted password for loginId: {}", member.getLoginId());

        return member;
    }
}
