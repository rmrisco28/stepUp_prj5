package com.example.backend.competencyAssessment.service;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.repository.CompetencyRepository;
import com.example.backend.competency.repository.SubCompetencyRepository;
import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competency.dto.MainCompetencyDto;
import com.example.backend.competencyAssessment.entity.Assessment;
import com.example.backend.competencyAssessment.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final CompetencyRepository competencyRepository;
    private final SubCompetencyRepository subCompetencyRepository;

    public void add(AssessmentDto dto) {
        Assessment assessment = new Assessment();
        assessment.setCaTitle(dto.getCaTitle());
        assessment.setStartDttm(dto.getStartDttm());
        assessment.setEndDttm(dto.getEndDttm());

        assessmentRepository.save(assessment);
    }

    public Map<String, Object> list(Integer pageNumber) {
        Page<AssessmentDto> assessmentDtoPage = assessmentRepository.findAllBy(PageRequest.of(pageNumber - 1, 5));

        int totalPages = assessmentDtoPage.getTotalPages(); // 마지막 페이지
        int rightPageNumber = ((pageNumber - 1) / 5 + 1) * 5;
        int leftPageNumber = rightPageNumber - 4;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of(
                "totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "assessmentList", assessmentDtoPage.getContent());
    }

    public ResponseEntity<?> delete(int seq) {
        Assessment assessment = assessmentRepository.findBySeq(seq);

        System.out.println("assessment = " + assessment);
        assessmentRepository.delete(assessment);
        return ResponseEntity.ok().body(Map.of(
                "message", "역량 진단 목록이 삭제되었습니다."));
    }

    public List<?> competencyList() {
        List<CompetencyDto> competencyDtos = competencyRepository.findAllCompetenciesUse();
        return competencyDtos;
    }

    public List<?> subCompetencyList() {
        List<MainCompetencyDto> subCompetencyDtos = subCompetencyRepository.findAllSubCompetenciesUse();
        return subCompetencyDtos;
    }
}
