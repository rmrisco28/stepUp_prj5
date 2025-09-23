package com.example.backend.member.dto;

import lombok.Data;

@Data
public class ChangePwForm {
    private Integer memberSeq;
    private String oldPassword;
    private String newPassword;
}
