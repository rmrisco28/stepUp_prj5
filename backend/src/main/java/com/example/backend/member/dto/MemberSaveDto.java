package com.example.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSaveDto {

    private String loginId;     // Student, Employee의 studentNo, employeeNo
    private String rawPassword; // 생년월일 (암호화 전), String 으로 가져옴
}