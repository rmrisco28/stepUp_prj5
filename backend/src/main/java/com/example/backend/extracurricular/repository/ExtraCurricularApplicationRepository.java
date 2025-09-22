package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularApplication;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExtraCurricularApplicationRepository extends JpaRepository<ExtraCurricularApplication, Integer> {

    // 비교과 중복 신청 방지
    boolean existsByMemberSeq_IdAndProgramSeq_SeqAndStatus(Integer memberSeq, Integer programSeq, int i);

    Optional<ExtraCurricularApplication> existsByMemberSeq_IdAndProgramSeq_Seq(Integer memberSeq, Integer programSeq);
}