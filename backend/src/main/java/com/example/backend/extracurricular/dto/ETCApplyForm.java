package com.example.backend.extracurricular.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ETCApplyForm {
    private Integer programSeq;
    private Integer memberSeq;
    private String motive;
}
