package com.example.backend.batch.student.repository;

import com.example.backend.batch.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // FIXME 유민 : 이걸 쓰게 될지 모르겠네
    @Query("SELECT COUNT(s) FROM Student s WHERE s.admissionYear = :admissionYear AND s.major = :mj_department")
    int countByAdmissionYearAndDepartment(@Param("admissionYear") Integer admissionYear,
                                          @Param("department") String mj_department);

    // 중복 체크 메서드 : 모두 다른 batch로 인식되므로, 같은 값이 들어있으면 넘어가게 함.
    boolean existsByStudentNo(String studentNo);

    // 이름 가져오기
    Optional<Student> findByStudentNo(String studentNo);

    // 이름, 생년월일, 성별로 중복 체크
    boolean existsByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}