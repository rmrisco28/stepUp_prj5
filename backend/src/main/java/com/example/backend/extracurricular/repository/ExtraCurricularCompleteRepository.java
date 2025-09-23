package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.dto.ETCCompleteDto;
import com.example.backend.extracurricular.entity.ExtraCurricularApplication;
import com.example.backend.extracurricular.entity.ExtraCurricularComplete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExtraCurricularCompleteRepository extends JpaRepository<ExtraCurricularComplete, Integer> {

    @Query("SELECT new com.example.backend.extracurricular.dto.ETCCompleteDto(" +
           "e.seq, " +              // 비교과 내역 seq
           "p.seq, " +              // 프로그램 seq 추가
           "p.title, " +
           "p.operateStartDt, " +
           "p.operateEndDt, " +
           "CASE WHEN e.completeStatus = 0 THEN '미이수' ELSE '이수' END) " +
           "FROM ExtraCurricularComplete e " +
           "JOIN e.programSeq p " +
           "WHERE e.memberSeq.id = :memberSeq")
    List<ETCCompleteDto> findByMemberSeq(@Param("memberSeq") Integer memberSeq);
    List<ExtraCurricularComplete> findByMemberSeq_Id(Integer memberSeq);

    Optional<ExtraCurricularComplete> findByApplicationSeq(ExtraCurricularApplication applicationSeq);
}