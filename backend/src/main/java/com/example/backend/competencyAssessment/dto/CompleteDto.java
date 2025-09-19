package com.example.backend.competencyAssessment.dto;

import com.example.backend.competencyAssessment.entity.Complete;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link Complete}
 */
@Data
@AllArgsConstructor
public class CompleteDto implements Serializable {
    Integer seq;
    Integer studentSeqId;
    String studentSeqStudentNo;
    String studentSeqName;
    Integer caSeqSeq;
    String caSeqCaTitle;
    LocalDateTime assessmentDttm;
}