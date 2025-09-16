package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Assessment;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Assessment}
 */
@Data
@AllArgsConstructor
public class AssessmentTitleDto implements Serializable {
    Integer seq;
    String caTitle;
}