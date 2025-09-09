package com.example.backend.batch.service;

import com.example.backend.batch.dto.StudentCsvDto;
import com.example.backend.batch.entity.MjDepartment;
import com.example.backend.batch.entity.Student;
import com.example.backend.batch.repository.MjDepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentNumberGenerator {

    private final MjDepartmentRepository mjDepartmentRepository;

    // CSV 데이터를 Student 엔티티 리스트로 변환하며 학번 생성
    public List<Student> generateStudentNumbers(List<StudentCsvDto> csvDataList) {

        // 1. 입학년도 + 학과별로 그룹핑
        Map<String, List<StudentCsvDto>> groupedStudents = csvDataList.stream()
                .collect(Collectors.groupingBy(dto ->
                        dto.getAdmissionYearAsInteger() + "_" + dto.getMajor()));

        return groupedStudents.entrySet().stream()
                .flatMap(entry -> {
                    String groupKey = entry.getKey();
                    List<StudentCsvDto> students = entry.getValue();

                    log.info("Processing group: {}, student count: {}", groupKey, students.size());

                    // 2. 그룹 내에서 정렬 (이름 -> 성별 -> 생년월일)
                    students.sort(getStudentComparator());

                    // 3. 순번을 매기면서 Student 엔티티 생성
                    AtomicInteger sequence = new AtomicInteger(1);

                    return students.stream().map(dto -> {
                        String departmentCode = getDepartmentCode(dto.getMajor());
                        String studentNumber = generateStudentNumber(
                                dto.getAdmissionYearAsInteger(),
                                departmentCode,
                                sequence.getAndIncrement()
                        );

                        return Student.builder()
                                .studentNo(studentNumber)
                                .name(dto.getName())
                                .gender(dto.getGender())
                                .birthDate(dto.getBirthDateAsLocalDate())
                                .major(dto.getMajor())
                                .admissionYear(dto.getAdmissionYearAsInteger())
                                .build();
                    });
                })
                .collect(Collectors.toList());
    }

    // 학생 정렬 기준: 이름(오름차순) -> 성별(남자우선) -> 생년월일(빠른순)
    private Comparator<StudentCsvDto> getStudentComparator() {
        return Comparator
                .comparing(StudentCsvDto::getName)
                .thenComparing(dto -> dto.getGender().equals("남") ? 0 : 1)
                .thenComparing(StudentCsvDto::getBirthDateAsLocalDate);
    }


    // 학과명으로 학과코드 조회
    private String getDepartmentCode(String mjName) {
        MjDepartment department = mjDepartmentRepository.findByMjName(mjName)
                .orElseThrow(() -> new IllegalArgumentException(
                        "존재하지 않는 학과입니다: " + mjName));
        return department.getMjCode();
    }

    // 학번 생성: 입학년도(4자리) + 학과코드(3자리) + 순번(3자리)
    private String generateStudentNumber(Integer admissionYear, String departmentCode, int sequence) {
        return String.format("%d%s%03d", admissionYear, departmentCode, sequence);
    }
}