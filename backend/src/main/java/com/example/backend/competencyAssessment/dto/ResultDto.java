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
public class ResultDto implements Serializable {
    Integer seq;
    Integer memberSeqId;

    Integer memberSeqStudentId;
    String memberSeqStudentStudentNo;
    String memberSeqStudentName;
    String memberSeqStudentMajor;
    Integer memberSeqStudentMemberSeqId; // 나중에 지워도?

    Integer subCompetencySeqSeq;
    Integer subCompetencySeqCompetencySeqSeq;
    String subCompetencySeqCompetencySeqCompetencyName;
    Boolean subCompetencySeqCompetencySeqUseYn;
    String subCompetencySeqSubCompetencyName;
    Boolean subCompetencySeqUseYn;

    Integer caSeqSeq;
    String caSeqCaTitle;
    Boolean caSeqUseYn;
    Double score;
}