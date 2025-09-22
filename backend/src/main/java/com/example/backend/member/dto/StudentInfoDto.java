package com.example.backend.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentInfoDto {
    //    private String name;
    private String phone;
    // 추후 필요하면 더 추가하기
}
