package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
//@NoArgsConstructor
@RequiredArgsConstructor
public class ETCListDto {
    private final Integer seq;
    private final String title;
    private final LocalDateTime operateStartDt;
    private final LocalDateTime operateEndDt;
    private final LocalDateTime applyStartDt;
    private final LocalDateTime applyEndDt;
    private final Integer capacity;
    private final LocalDateTime createdAt;
    private final String status;
    private final Boolean useYn;

    private String thumbUrl;

    private final Integer applicants;
}
