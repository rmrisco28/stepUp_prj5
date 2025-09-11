package com.example.backend.competency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.competency.entity.SubCompetency}
 */
@Data
@AllArgsConstructor
public class SubCompetencyDto implements Serializable {
    Integer seq;
    Integer competencySeqId;
    String subCompetencyName;
    String subCompetencyExpln;
    Boolean useYn;
}