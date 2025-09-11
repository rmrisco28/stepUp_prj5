package com.example.backend.competency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.competency.entity.Competency}
 */
@Data
@AllArgsConstructor
public class CompetencyDto implements Serializable {
    Integer seq;
    String competencyName;
    String competencyExpln;
    Boolean useYn;
}