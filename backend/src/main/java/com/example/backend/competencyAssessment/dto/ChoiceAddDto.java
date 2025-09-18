package com.example.backend.competencyAssessment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.competencyAssessment.entity.Choice}
 */
@Data
@AllArgsConstructor
public class ChoiceAddDto implements Serializable {
    Integer id;
    Integer questionSeqSeq;
    String option;
    Integer point;
}