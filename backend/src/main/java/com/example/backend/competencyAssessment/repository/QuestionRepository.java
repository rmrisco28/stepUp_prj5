package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.QuestionDto;
import com.example.backend.competencyAssessment.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<QuestionDto> findByCaSeqSeq(int seq);


//    List<QuestionDto> findByCaSeq(int seq);


//    @Query(value = """
//            SELECT new com.example.backend.competencyAssessment.dto.QuestionDto(
//                q.seq,
//                q.caSeq.seq,
//                q.caSeq.caTitle,
//                q.caSeq.useYn,
//
//                q.subCompetencySeq.seq,
//                q.subCompetencySeq.subCompetencyName,
//                q.subCompetencySeq.useYn,
//
//                q.questionNum,
//                q.question,
//                q.score
//            )FROM Question q
//                        WHERE q.caSeq.useYn =true
//                     AND q.subCompetencySeq.useYn= true
//                     ORDER By q.questionNum
//            """)
}