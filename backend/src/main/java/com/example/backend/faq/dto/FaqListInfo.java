package com.example.backend.faq.dto;

import java.time.LocalDateTime;

public interface FaqListInfo {
    Integer getSeq();

    String getQuestion();

    String getAnswer();

    LocalDateTime getInsertedAt();
}
