package com.example.backend.competencyAssessment.repository;

import com.example.backend.competencyAssessment.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseRepository extends JpaRepository<Response, Integer> {

}