package com.example.backend.batch.employee.repository;

import com.example.backend.batch.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query("SELECT e.employeeNo FROM Employee e WHERE e.employeeNo LIKE CONCAT(:prefix, '%')")
    List<String> findEmployeeNumbersByPrefix(@Param("prefix") String prefix);

    // 중복 체크 메서드
    boolean existsByEmployeeNo(String employeeNo);
}