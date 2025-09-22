package com.example.backend.extracurricular.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ETCAddForm {
    private String title;
    private String content;
    private LocalDateTime operateStartDt;
    private LocalDateTime operateEndDt;
    private LocalDateTime applyStartDt;
    private LocalDateTime applyEndDt;
    private Integer competency;
    private String location;
    private String operationType;
    private String grades;
    private Integer capacity;
    private String manager;
    private String managerPhone;
    private Integer mileagePoints;
    private String author;

    private MultipartFile thumbnail;
    private List<MultipartFile> contentImages;
}
