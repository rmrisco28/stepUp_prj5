package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ETCEditForm {
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
    private String status;
    private String manager;
    private String managerPhone;
    private Integer mileagePoints;
    private String author;
    private LocalDateTime updatedAt;
    private Boolean useYn;

    private List<MultipartFile> thumbnails;
    private String[] deleteThumbnails;
    private List<MultipartFile> contentImages;
    private String[] deleteContentImages;


}
