package com.example.backend.batch.repository;

import com.example.backend.batch.entity.Mjdepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MjdepartmentRepository extends JpaRepository<Mjdepartment, String> {

    Optional<Mjdepartment> findByMjName(String MjName);
}