package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import com.example.backend.extracurricular.enums.OperationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExtraCurricularProgramRepository extends JpaRepository<ExtraCurricularProgram, Integer> {

    @Query("""
                SELECT new com.example.backend.extracurricular.dto.ETCListDto(
                    e.seq,
                    e.title,
                    e.operateStartDt,
                    e.operateEndDt,
                    e.applyStartDt,
                    e.applyEndDt,
                    e.capacity,
                    e.createdAt,
                    e.status,
                    e.grades,
                    e.operationType,
                    e.subCompetency.subCompetencyName,
                    e.applicants
                )
                FROM ExtraCurricularProgram e
                WHERE (:keyword IS NULL OR :keyword = '' OR e.title LIKE %:keyword%)
                  AND (:competency IS NULL OR e.subCompetency.seq = :competency)
                  AND (:operationType IS NULL OR e.operationType = :operationType)
                  AND (:grade IS NULL OR e.grades LIKE %:grade%)
                ORDER BY e.createdAt DESC
            """)
    Page<ETCListDto> findAllBy(
            PageRequest pageRequest,
            String keyword,
            Integer competency,
            OperationType operationType,
            String grade
    );


}