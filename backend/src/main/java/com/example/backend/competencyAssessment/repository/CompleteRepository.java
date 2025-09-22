package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.entity.Complete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompleteRepository extends JpaRepository<Complete, Integer> {
}