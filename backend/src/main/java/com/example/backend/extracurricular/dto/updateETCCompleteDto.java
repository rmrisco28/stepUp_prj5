package com.example.backend.extracurricular.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class updateETCCompleteDto {
    private Integer applicationSeq;
    private Integer memberSeq;
    private Integer completeStatus;
}
