package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competencyAssessment.dto.AssessmentTitleDto;
import com.example.backend.competencyAssessment.dto.ChoiceListDto;
import com.example.backend.competencyAssessment.entity.Assessment;
import com.example.backend.competencyAssessment.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {


    @Query(value = """
                    SELECT new com.example.backend.competencyAssessment.dto.AssessmentDto(
                        a.seq,
                        a.caTitle,
                        a.createDttm,
                        a.startDttm,
                        a.endDttm,
                        a.useYn)
                        FROM Assessment a ORDER BY a.seq DESC
            """)
    Page<AssessmentDto> findAllBy(PageRequest of);

    AssessmentDto findBySeq(int seq);


    List<AssessmentTitleDto> findAssessmentBySeq(Integer seq);

    Assessment findEntityBySeq(int seq);


    Assessment findByCaSeq(int seq);
}