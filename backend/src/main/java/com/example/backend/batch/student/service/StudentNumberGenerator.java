package com.example.backend.batch.student.service;

import com.example.backend.batch.student.dto.StudentCsvDto;
import com.example.backend.batch.student.entity.MjDepartment;
import com.example.backend.batch.student.entity.Student;
import com.example.backend.batch.student.repository.MjDepartmentRepository;
import com.example.backend.batch.student.repository.StudentRepository;
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
    // 학번은 1년에 한번 일어난다고 가정하고 항상 001 부터 시작되도 됨
    private final StudentRepository studentRepository;
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
                    AtomicInteger sequence = new AtomicInteger(1); // 원자적으로 처리해서 순번 중복 증가 방지

                    return students.stream()
                            .filter(dto -> !isDuplicateStudent(dto)) // 학생도 같은 학생인지 확인해서 학번 생성 안되도록
                            .map(dto -> {
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

    // 중복 학생 체크 (이름, 생년월일, 성별로 판단)
    private boolean isDuplicateStudent(StudentCsvDto dto) {
        return studentRepository.existsByNameAndBirthDateAndGender(
                dto.getName(),
                dto.getBirthDateAsLocalDate(),
                dto.getGender()
        );
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