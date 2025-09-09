package com.example.backend.batch.repository;

import com.example.backend.batch.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT COUNT(s) FROM Student s WHERE s.admissionYear = :admissionYear AND s.major = :mj_department")
    int countByAdmissionYearAndDepartment(@Param("admissionYear") Integer admissionYear,
                                          @Param("department") String mj_department);
}