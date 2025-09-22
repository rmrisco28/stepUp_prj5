package com.example.backend.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentAppForm {
    private String name;
    private String phone;
    private String motive;
    private Boolean privacyAgreed;
}
