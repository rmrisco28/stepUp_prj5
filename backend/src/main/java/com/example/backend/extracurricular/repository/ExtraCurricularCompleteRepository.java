package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularComplete;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExtraCurricularCompleteRepository extends JpaRepository<ExtraCurricularComplete, Integer> {
    List<ExtraCurricularComplete> findByMemberSeq_Id(Integer memberSeq);
}