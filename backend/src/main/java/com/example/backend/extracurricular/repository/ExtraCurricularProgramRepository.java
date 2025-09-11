package com.example.backend.extracurricular.repository;

import com.example.backend.extracurricular.entity.ExtraCurricularProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface ExtraCurricularProgramRepository extends JpaRepository<ExtraCurricularProgram, Integer> {
}