package com.example.backend.competencyAssessment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.backend.competencyAssessment.entity.Complete}
 */
@Data
@AllArgsConstructor
public class CompleteSaveDto implements Serializable {
    Integer seq;
    Integer studentSeqId;
    Integer caSeqSeq;
    LocalDateTime assessmentDttm;
}