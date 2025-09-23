package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.entity.Response;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Integer> {


    List<Response> findByQuestionSeqCaSeqSeqAndMemberSeqId(int assessmentSeq, int memberSeq);
}