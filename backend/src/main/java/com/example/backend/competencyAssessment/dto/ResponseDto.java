package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Response;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link Response}
 */
@Data
@AllArgsConstructor
public class ResponseDto implements Serializable {
    Integer seq;
    Integer memberSeq;
    Integer questionSeqSeq;
    Integer questionSeqQuestionNum;
    Integer choiceSeqSeq;
}