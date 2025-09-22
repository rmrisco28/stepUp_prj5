package com.example.backend.extracurricular.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AppList {
    private Integer seq;
    private String title;
    // 운영 일정
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    // 운영 방식
    private String operationType;
}
