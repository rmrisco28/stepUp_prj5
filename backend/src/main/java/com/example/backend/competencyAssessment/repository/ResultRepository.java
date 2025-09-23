package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.ResultDto;
import com.example.backend.competencyAssessment.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    @Query(value = """
                    SELECT new com.example.backend.competencyAssessment.dto.ResultDto(
                    r.seq,
                    r.memberSeq.id,
            
                    r.memberSeq.student.id,
                    r.memberSeq.student.studentNo,
                    r.memberSeq.student.name,
                    r.memberSeq.student.major,
                    r.memberSeq.student.memberSeq.id,
            
                    r.subCompetencySeq.seq,
                    r.subCompetencySeq.competencySeq.seq,
                    r.subCompetencySeq.competencySeq.competencyName,
                    r.subCompetencySeq.competencySeq.useYn,
                    r.subCompetencySeq.subCompetencyName,
                    r.subCompetencySeq.useYn,
            
                    r.caSeq.seq,
                    r.caSeq.caTitle,
                    r.caSeq.useYn,
                    r.score
                    )
                    FROM Result r
                    WHERE r.caSeq.seq = :seq
                    AND r.memberSeq.id = :memberSeq
                    AND r.subCompetencySeq.competencySeq.useYn = true
                    AND r.subCompetencySeq.useYn = true
                    ORDER BY r.subCompetencySeq.seq
            """)
    List<ResultDto> findBySeq(int seq, int memberSeq);
}