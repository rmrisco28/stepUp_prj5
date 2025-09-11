package com.example.backend.batch.student.processor;

import com.example.backend.batch.student.dto.StudentCsvDto;
import com.example.backend.batch.student.entity.Student;
import com.example.backend.batch.student.service.StudentNumberGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class StudentItemProcessor implements ItemProcessor<List<StudentCsvDto>, List<Student>> {

    private final StudentNumberGenerator studentNumberGenerator;

    @Override
    public List<Student> process(List<StudentCsvDto> csvDataList) throws Exception {
        log.info("Processing {} CSV records", csvDataList.size());

        // 데이터 유효성 검사
        validateCsvData(csvDataList);

        // 학번 생성 및 Student 엔티티 변환
        List<Student> students = studentNumberGenerator.generateStudentNumbers(csvDataList);

        log.info("Generated {} student records with student numbers", students.size());

        // 생성된 학번 로그 (샘플)
        students.stream()
                .limit(5)
                .forEach(student -> log.info("Generated student: {} - {}",
                        student.getStudentNo(), student.getName()));

        return students;
    }

    /**
     * CSV 데이터 유효성 검사
     */
    private void validateCsvData(List<StudentCsvDto> csvDataList) {
        for (int i = 0; i < csvDataList.size(); i++) {
            StudentCsvDto dto = csvDataList.get(i);
            int lineNumber = i + 1; // CSV 파일의 실제 라인 번호 (헤더 고려)

            if (dto.getName() == null || dto.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 이름이 비어있습니다.");
            }

            if (dto.getGender() == null || (!dto.getGender().equals("남") && !dto.getGender().equals("여"))) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 성별은 '남' 또는 '여'만 가능합니다.");
            }

            if (dto.getBirthDate() == null || dto.getBirthDate().trim().isEmpty()) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 생년월일이 비어있습니다.");
            }

            if (dto.getMajor() == null || dto.getMajor().trim().isEmpty()) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 학과가 비어있습니다.");
            }

            if (dto.getAdmissionYear() == null || dto.getAdmissionYear().trim().isEmpty()) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 입학년도가 비어있습니다.");
            }

            try {
                dto.getBirthDateAsLocalDate();
            } catch (Exception e) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)");
            }

            try {
                dto.getAdmissionYearAsInteger();
            } catch (Exception e) {
                throw new IllegalArgumentException("Line " + lineNumber + ": 입학년도 형식이 올바르지 않습니다.");
            }
        }
    }
}