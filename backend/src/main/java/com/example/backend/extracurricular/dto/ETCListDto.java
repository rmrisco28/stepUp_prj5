package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCListDto {
    private Integer seq;
    private String title;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private LocalDateTime applyStartDt;
    private LocalDateTime applyEndDt;
    private Integer capacity;
    private LocalDateTime createdAt;
    private String status;
    private Boolean useYn;
    private String thumbnail;
    private String thumbnailPath;

    public ETCListDto(Integer seq, String title,
                      LocalDateTime operateStartDt, LocalDateTime operateEndDt,
                      LocalDateTime applyStartDt, LocalDateTime applyEndDt,
                      Integer capacity, LocalDateTime createdAt, String status, Boolean useYn, String name) {
        this.seq = seq;
        this.title = title;
        this.operateStartDt = operateStartDt;
        this.operateEndDt = operateEndDt;
        this.applyStartDt = applyStartDt;
        this.applyEndDt = applyEndDt;
        this.capacity = capacity;
        this.createdAt = createdAt;
        this.status = status;
        this.useYn = useYn;
        this.thumbnail = name;
    }
}
