package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Question}
 */
@Data
@AllArgsConstructor
public class QuestionDto implements Serializable {
    Integer seq;

    Integer caSeqSeq;
    String caSeqCaTitle;
    Boolean caSeqUseYn;

    Integer subCompetencySeqSeq;
    String subCompetencySeqSubCompetencyName;
    Boolean subCompetencySeqUseYn;
    
    Integer questionNum;
    String question;
    Double score;
}