package com.example.backend.notice.dto;

import lombok.Data;

@Data
public class NoticeAddForm {
    private String title;
    private String content;
    private Integer memberSeq;
}
