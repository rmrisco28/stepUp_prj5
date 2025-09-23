package com.example.backend.extracurricular.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class applyStudentDto {
    private Integer seq;
    private String name;
}
