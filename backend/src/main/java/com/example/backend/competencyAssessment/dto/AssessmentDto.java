package com.example.backend.competencyAssessment.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.example.backend.competencyAssessment.entity.Assessment}
 */
@Value
public class AssessmentDto implements Serializable {
    Integer seq;
    String caTitle;
    LocalDate createDttm;
    LocalDate startDttm;
    LocalDate endDttm;
    Boolean useYn;
}