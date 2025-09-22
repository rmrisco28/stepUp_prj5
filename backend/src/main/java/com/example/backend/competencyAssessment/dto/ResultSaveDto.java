package com.example.backend.competencyAssessment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.competencyAssessment.entity.Result}
 */
@Data
@AllArgsConstructor
public class ResultSaveDto implements Serializable {
    Integer seq;
    Integer memberSeqId;
    Integer subCompetencySeqSeq;
    Integer caSeqSeq;
    Integer score;
}