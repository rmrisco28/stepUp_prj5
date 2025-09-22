package com.example.backend.faq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaqDto {
    private Integer seq;
    private String question;
    private String answer;
    private LocalDateTime insertedAt;
}
