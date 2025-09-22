package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.ChoiceAddDto;
import com.example.backend.competencyAssessment.dto.ChoiceListDto;
import com.example.backend.competencyAssessment.entity.Choice;
import com.example.backend.competencyAssessment.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
    // 정답 조회
    @Query(value = """
                SELECT new com.example.backend.competencyAssessment.dto.ChoiceListDto (
                    c.seq,
                    c.questionSeq.seq,
                    c.questionSeq.caSeq.seq,
                    c.questionSeq.questionNum,
                    c.order,
                    c.option,
                    c.point
                )
                FROM Choice c
                WHERE c.questionSeq.questionNum = :questionNum
                AND c.questionSeq.caSeq.seq = :seq
                ORDER BY c.order
            
            """)
    List<ChoiceListDto> findByQuestionSeqNum(int seq, int questionNum);

    Choice findByQuestionSeqSeq(int num);

    Choice findBySeq(Integer seq);

    @Query(value = """
                SELECT new com.example.backend.competencyAssessment.dto.ChoiceListDto (
                                c.seq,
                                c.questionSeq.seq,
                                c.questionSeq.caSeq.seq,
                                c.questionSeq.questionNum,
                                c.order,
                                c.option,
                                c.point
                            )
                            FROM Choice c
                            WHERE c.questionSeq.caSeq.seq = :seq
                            ORDER BY c.order
            """)
    List<ChoiceListDto> findByQuestionSeqCaSeqSeq(int seq);

}