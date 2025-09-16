package com.example.backend.competency.repository;

import com.example.backend.competency.dto.MainCompetencyDto;
import com.example.backend.competency.dto.SubCompetencyListDto;
import com.example.backend.competency.dto.SubCompetencyMainDto;
import com.example.backend.competency.entity.Competency;
import com.example.backend.competency.entity.SubCompetency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubCompetencyRepository extends JpaRepository<SubCompetency, Integer> {

    @Query(value = """
            SELECT  new com.example.backend.competency.dto.SubCompetencyListDto(
                s.seq,
                s.competencySeq.competencyName,
                s.subCompetencyName,
                s.subCompetencyExpln,
                s.useYn)
                FROM SubCompetency s
                WHERE s.competencySeq.useYn = true
                Order By s.seq DESC
            """)
    List<SubCompetencyListDto> findAllSubCompetencies();

    SubCompetency findBySeq(int seq);

    @Query(value = """
            SELECT  new com.example.backend.competency.dto.SubCompetencyMainDto(
                s.seq,
                s.competencySeq.competencyName,
                s.competencySeq.competencyExpln,
                s.subCompetencyName,
                s.subCompetencyExpln,
                s.useYn)
                FROM SubCompetency s
                WHERE s.useYn = true and s.competencySeq.useYn = true
                Order By s.seq DESC
            """)
    List<SubCompetencyMainDto> findUseSubCompetencies();

    List<SubCompetency> findByCompetencySeq(Competency competency);


    @Query(value = """
                    SELECT new com.example.backend.competency.dto.MainCompetencyDto(
                     c.seq,
                     c.competencySeq.seq,
                     c.competencySeq.competencyName,
                     c.competencySeq.useYn,
                     c.subCompetencyName,
                     c.useYn)
                     FROM SubCompetency c
                     WHERE c.useYn = true
                     AND c.competencySeq.useYn = true
                     ORDER BY c.seq DESC
            """)
    List<MainCompetencyDto> findAllSubCompetenciesUse();
}