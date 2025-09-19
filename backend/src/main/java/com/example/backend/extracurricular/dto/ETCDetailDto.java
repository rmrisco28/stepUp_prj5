package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCDetailDto {
    private Integer seq;
    private String title;
    private String content;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private LocalDateTime applyStartDt;
    private LocalDateTime applyEndDt;
    private String competency;
    private String location;
    private String operationType;
    private String grades;
    private Integer capacity;
    private Integer applicants;
    private Integer waiting;
    private String status;
    private Integer mileagePoints;
    private String manager;
    private String managerPhone;
    private String Author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean useYn;

    private String thumbnails;
    private List<String> contentImages;

//    private List<ETCImageThumbDto> thumbnails;
//    private List<ETCImageContentDto> contentImages;

    public ETCDetailDto(Integer seq, String title, String content,
                        LocalDateTime operateStartDt, LocalDateTime operateEndDt,
                        LocalDateTime applyStartDt, LocalDateTime applyEndDt,
                        String competency, String location, String operationType,
                        String grades, Integer capacity, Integer applicants, Integer waiting,
                        String status, Integer mileagePoints, String manager, String managerPhone,
                        String author, LocalDateTime createdAt, LocalDateTime updatedAt,
                        Boolean useYn) {
        this.seq = seq;
        this.title = title;
        this.content = content;
        this.operateStartDt = operateStartDt;
        this.operateEndDt = operateEndDt;
        this.applyStartDt = applyStartDt;
        this.applyEndDt = applyEndDt;
        this.competency = competency;
        this.location = location;
        this.operationType = operationType;
        this.grades = grades;
        this.capacity = capacity;
        this.applicants = applicants;
        this.waiting = waiting;
        this.status = status;
        this.mileagePoints = mileagePoints;
        this.manager = manager;
        this.managerPhone = managerPhone;
        this.Author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.useYn = useYn;
    }
}
