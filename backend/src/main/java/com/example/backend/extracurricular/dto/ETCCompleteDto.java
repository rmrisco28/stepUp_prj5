package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCCompleteDto {
    private Integer seq;
    private Integer programSeq;
    private String title;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private String completeStatus;
}
