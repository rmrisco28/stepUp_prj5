package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.QuestionAddDto;
import com.example.backend.competencyAssessment.dto.QuestionListDto;
import com.example.backend.competencyAssessment.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {


//    List<QuestionListDto> findByCaSeqSeq(int seq);

    Question findBySeq(Integer questionSeqSeq);

    @Query(value = """
            SELECT q FROM Question q WHERE q.questionNum = :questionNum
            """)
    Object findByQuestionNum(Integer questionNum);

    @Query(value = """
            SELECT new com.example.backend.competencyAssessment.dto.QuestionListDto(
                    q.seq,
                    q.caSeq.seq,
                    q.caSeq.caTitle,
                    q.caSeq.useYn,
                    q.subCompetencySeq.seq,
                    q.subCompetencySeq.competencySeq.seq,
                    q.subCompetencySeq.competencySeq.competencyName,
                    q.subCompetencySeq.competencySeq.useYn,
                    q.subCompetencySeq.subCompetencyName,
                    q.subCompetencySeq.useYn,
                    q.questionNum,
                    q.question,
                    q.score)
            FROM Question q
            WHERE q.caSeq.seq = :seq
            AND q.caSeq.useYn = true
            AND q.subCompetencySeq.useYn = true
            AND q.subCompetencySeq.competencySeq.useYn = true
            ORDER BY q.questionNum
            """)
    Page<QuestionListDto> findByCaSeqSeq(int seq, Pageable pageable);


    @Query(value = """
                SELECT new com.example.backend.competencyAssessment.dto.QuestionListDto(
                    q.seq,
                    q.caSeq.seq,
                    q.caSeq.caTitle,
                    q.caSeq.useYn,
                    q.subCompetencySeq.seq,
                    q.subCompetencySeq.competencySeq.seq,
                    q.subCompetencySeq.competencySeq.competencyName,
                    q.subCompetencySeq.competencySeq.useYn,
                    q.subCompetencySeq.subCompetencyName,
                    q.subCompetencySeq.useYn,
                    q.questionNum,
                    q.question,
                    q.score)
                FROM Question q
                WHERE q.questionNum = :questionNum
                AND q.caSeq.seq = :seq
            """)
    QuestionListDto findByQuestionNum(int seq, int questionNum);

    boolean existsByCaSeq_SeqAndQuestionNum(Integer caSeqSeq, Integer questionNum);

    boolean existsByQuestionNum(Integer questionNum);

    Question findByCaSeqSeqAndQuestionNum(int seq, int num);


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