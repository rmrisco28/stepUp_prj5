package com.example.backend.competencyAssessment.service;

import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competencyAssessment.entity.Assessment;
import com.example.backend.competencyAssessment.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;

    public void add(AssessmentDto dto) {
        Assessment assessment = new Assessment();
        assessment.setCaTitle(dto.getCaTitle());
        assessment.setStartDttm(dto.getStartDttm());
        assessment.setEndDttm(dto.getEndDttm());

        assessmentRepository.save(assessment);
    }
//
//    public ResponseEntity<?> list() {
//        List<AssessmentDto> assessmentDtoList = assessmentRepository.findAllAssessment();
//        return assessmentDtoList;
//    }
}
