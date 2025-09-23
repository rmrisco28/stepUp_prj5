package com.example.backend.notice.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NoticeDto {
    private Integer seq;
    private String title;
    private String content;
    private LocalDateTime insertedAt;
    private String author;
}
