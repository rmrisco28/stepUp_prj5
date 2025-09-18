package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
}