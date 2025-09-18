package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Choice;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Choice}
 */
@Data
@AllArgsConstructor
public class ChoiceListDto implements Serializable {
    Integer seq;
    Integer questionSeqSeq;
    Integer questionSeqCaSeqSeq;
    Integer questionSeqQuestionNum;
    Integer order;
    String option;
    Double point;

}