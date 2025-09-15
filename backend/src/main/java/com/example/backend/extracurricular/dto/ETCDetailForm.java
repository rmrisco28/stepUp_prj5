package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCDetailForm {
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
    private String manager;
    private String managerPhone;
    private Integer mileagePoints;
    private Instant createdAt;
    private Instant updatedAt;
    private String author;
}
