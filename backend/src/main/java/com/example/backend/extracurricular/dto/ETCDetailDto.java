package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCDetailDto {
    private Integer seq;
    private String title;
    private String content;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private LocalDateTime applyStartDt;
    private LocalDateTime applyEndDt;
    private String competency;
    private String location;
    private String operationType;
    private String grades;
    private Integer capacity;
    private Integer applicants;
    private Integer waiting;
    private String status;
    private Integer mileagePoints;
    private String manager;
    private String managerPhone;
    private String Author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean useYn;
}
