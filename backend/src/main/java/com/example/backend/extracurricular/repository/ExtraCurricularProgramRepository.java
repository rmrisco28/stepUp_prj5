package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.dto.ETCListDto;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExtraCurricularProgramRepository extends JpaRepository<ExtraCurricularProgram, Integer> {
    @Query("""
                SELECT new com.example.backend.extracurricular.dto.ETCListDto(
                    e.seq,
                    e.title,
                    e.createdAt,
                    e.status
                )
                FROM ExtraCurricularProgram e
                WHERE (:keyword = '' OR e.title LIKE %:keyword%)
            """)
    Page<ETCListDto> findAllBy(PageRequest pageRequest, String keyword);

}