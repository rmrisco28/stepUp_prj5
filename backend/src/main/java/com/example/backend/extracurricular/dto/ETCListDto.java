package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCListDto {
    private Integer seq;
    private String title;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private LocalDateTime applyStartDt;
    private LocalDateTime applyEndDt;
    private Integer capacity;
    private LocalDateTime createdAt;
    private String status;
    private Boolean useYn;
}
