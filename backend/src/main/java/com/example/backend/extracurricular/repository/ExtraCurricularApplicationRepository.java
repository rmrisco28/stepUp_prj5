package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularApplication;
import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
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

    // 삭제할 신청 프로그램 찾기
    Optional<ExtraCurricularApplication> findByMemberSeq_IdAndProgramSeq_Seq(Integer memberSeq, Integer programSeq);

    // 프로그램 시퀀스를 통해, 그 시퀀스에 해당하는 프로그램 신청 내역 목록 가져오기
    List<ExtraCurricularApplication> findByProgramSeq(ExtraCurricularProgram programSeq);
}