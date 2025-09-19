package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularApplication;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExtraCurricularApplicationRepository extends JpaRepository<ExtraCurricularApplication, Integer> {

}