package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCListDto {
    private Integer seq;
    private String title;
    private Instant createdAt;
    private String status;
}
