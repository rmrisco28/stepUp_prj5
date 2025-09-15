package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.dto.AssessmentDto;
import com.example.backend.competencyAssessment.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {
}