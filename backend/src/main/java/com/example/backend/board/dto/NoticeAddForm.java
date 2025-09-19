package com.example.backend.board.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class NoticeAddForm {
    private String title;
    private String content;
}
