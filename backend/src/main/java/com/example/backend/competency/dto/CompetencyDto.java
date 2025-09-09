package com.example.backend.competency.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.backend.competency.entity.Competency}
 */
@Value
public class CompetencyDto implements Serializable {
    Integer id;
    String competencyName;
    String competencyExpln;
    Boolean useYn;
}