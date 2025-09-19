package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationRequestDto {
    private Integer programSeq;
    private String phone;
    private String motive;
}
