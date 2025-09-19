package com.example.backend.notice.dto;

import java.time.LocalDateTime;

public interface NoticeListInfo {
    Integer getId();

    String getTitle();

    LocalDateTime getInsertedAt();

//    Integer getAuthorSeq(); // 나중에 추가할 거
}
