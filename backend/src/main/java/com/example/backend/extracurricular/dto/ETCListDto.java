package com.example.backend.extracurricular.dto;

import com.example.backend.extracurricular.enums.OperationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

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
    private final String grades;
    private final OperationType operationType;

    private String thumbUrl;

    private final Integer applicants;
}
