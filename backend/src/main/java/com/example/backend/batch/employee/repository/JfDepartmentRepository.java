package com.example.backend.batch.employee.repository;

import com.example.backend.batch.employee.entity.JfDepartment;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface JfDepartmentRepository extends Repository<JfDepartment, String> {
    Optional<JfDepartment> findByJfName(String jobName);
}