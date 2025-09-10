package com.example.backend.batch.student.processor;

import com.example.backend.member.dto.MemberSaveDto;
import com.example.backend.member.entity.Member;
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
public class StudentSaveMemberItemProcessor implements ItemProcessor<MemberSaveDto, Member> {

    private final PasswordEncoder passwordEncoder;

    @Override
    public Member process(MemberSaveDto item) throws Exception {
        log.debug("Processing student for member creation with loginId: {}", item.getLoginId());

        // Assuming birth_date is read as a String in MemberSaveDto's rawPassword field
        String birthDateStr = item.getRawPassword();

        // 1. Convert YYYY-MM-DD string to YYMMDD format
        LocalDate birthDate = LocalDate.parse(birthDateStr, DateTimeFormatter.ISO_LOCAL_DATE);
        String rawPassword = birthDate.format(DateTimeFormatter.ofPattern("yyMMdd"));

        // 2. Encrypt the password using BCrypt
        String encryptedPassword = passwordEncoder.encode(rawPassword);

        // 3. Create the final Member entity
        Member member = new Member();
        member.setLoginId(item.getLoginId());
        member.setPassword(encryptedPassword);

        log.debug("Generated member entity with encrypted password for loginId: {}", member.getLoginId());

        return member;
    }
}