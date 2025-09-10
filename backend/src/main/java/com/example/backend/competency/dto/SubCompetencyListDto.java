package com.example.backend.competency.dto;

import com.example.backend.competency.entity.SubCompetency;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link SubCompetency}
 */
@Data
@AllArgsConstructor
public class SubCompetencyListDto implements Serializable {
    Integer seq;
    String competencySeqCompetencyName;
    String subCompetencyName;
    String subCompetencyExpln;
    Boolean useYn;
}