package com.example.backend.competencyAssessment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.example.backend.competencyAssessment.entity.Assessment}
 */
@Data
@AllArgsConstructor
public class AssessmentDto implements Serializable {
    Integer seq;
    String caTitle;
    LocalDate createDttm;
    LocalDate startDttm;
    LocalDate endDttm;
    Boolean useYn;
}