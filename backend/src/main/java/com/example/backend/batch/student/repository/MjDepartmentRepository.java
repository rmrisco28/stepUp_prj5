package com.example.backend.batch.student.repository;

import com.example.backend.batch.student.entity.MjDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MjDepartmentRepository extends JpaRepository<MjDepartment, String> {

    Optional<MjDepartment> findByMjName(String MjName);
}