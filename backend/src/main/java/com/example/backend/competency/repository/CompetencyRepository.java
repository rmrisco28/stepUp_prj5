package com.example.backend.competency.repository;

import com.example.backend.competency.dto.CompetencyDto;
import com.example.backend.competency.entity.Competency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompetencyRepository extends JpaRepository<Competency, Integer> {

    @Query(value = """
            SELECT new com.example.backend.competency.dto.CompetencyDto(
                 c.seq,
                 c.competencyName,
                 c.competencyExpln,
                 c.useYn)
                 FROM Competency c ORDER BY c.seq DESC
            """)
    List<CompetencyDto> findAllCompetencies();


    @Query(value = """
            SELECT new com.example.backend.competency.dto.CompetencyDto(
                 c.seq,
                 c.competencyName,
                 c.competencyExpln,
                 c.useYn)
                 FROM Competency c
                 WHERE c.useYn = true
                 ORDER BY c.seq DESC
            
            """)
    List<CompetencyDto> findAllCompetenciesUse();

    Competency findById(int id);

    Competency findBySeq(int seq);
}