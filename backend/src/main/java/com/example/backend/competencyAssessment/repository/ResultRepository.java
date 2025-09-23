package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Integer> {
}