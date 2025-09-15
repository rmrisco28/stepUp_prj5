package com.example.backend.extracurricular.dto;

import java.time.Instant;

public interface ETCListForm {
    Integer getSeq();

    String getTitle();

    Instant getCreatedAt();

    String getStatus();

}
