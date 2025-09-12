package com.example.backend.competency.repository;

import com.example.backend.competency.dto.SubCompetencyListDto;
import com.example.backend.competency.dto.SubCompetencyMainDto;
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
}