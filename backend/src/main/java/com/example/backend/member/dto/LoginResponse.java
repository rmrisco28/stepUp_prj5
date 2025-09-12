package com.example.backend.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private boolean success;
    private String message;
    private MemberInfo member;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberInfo {
        private Integer memberSeq;
        private String loginId;
    }
}