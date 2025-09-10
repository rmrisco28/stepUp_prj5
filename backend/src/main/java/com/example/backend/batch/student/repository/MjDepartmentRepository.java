package com.example.backend.batch.student.repository;

import com.example.backend.batch.student.entity.MjDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MjDepartmentRepository extends JpaRepository<MjDepartment, String> {
    // 학과명으로 학과코드 찾기 위해, 학과명이 존재하는지 확인하는 메소드
    Optional<MjDepartment> findByMjName(String MjName);
}