package com.example.backend.competency.repository;

import com.example.backend.competency.entity.Competency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetencyRepository extends JpaRepository<Competency, Integer> {
}