package com.example.backend.competency.dto;

import com.example.backend.competency.entity.SubCompetency;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link SubCompetency}
 */
@Data
@AllArgsConstructor
public class MainCompetencyDto implements Serializable {
    Integer seq;

    Integer competencySeqSeq;
    String competencySeqCompetencyName;
    Boolean competencySeqUseYn;

    String subCompetencyName;
    Boolean useYn;
}