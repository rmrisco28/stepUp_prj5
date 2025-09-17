package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Question}
 */
@Data
@AllArgsConstructor
public class QuestionAddDto implements Serializable {
    Integer seq;
    Integer caSeqSeq;
    Integer subCompetencySeqSeq;
    Integer questionNum;
    String question;
    Double score;
}