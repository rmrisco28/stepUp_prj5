package com.example.backend.batch.employee.service;

import com.example.backend.batch.employee.dto.EmployeeCsvDto;
import com.example.backend.batch.employee.entity.Employee;
import com.example.backend.batch.employee.entity.JfDepartment;
import com.example.backend.batch.employee.repository.EmployeeRepository;
import com.example.backend.batch.employee.repository.JfDepartmentRepository;
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
public class EmployeeNumberGenerator {

    private final JfDepartmentRepository jfDepartmentRepository;
    private final EmployeeRepository employeeRepository; // 기존 직원 정보 조회용

    // CSV 데이터를 Employee 엔티티 리스트로 변환하며 사번 생성
    public List<Employee> generateEmployeeNumbers(List<EmployeeCsvDto> csvDataList) {

        // 1. 입사년도 + 직무별로 그룹핑
        Map<String, List<EmployeeCsvDto>> groupedEmployees = csvDataList.stream()
                .collect(Collectors.groupingBy(dto ->
                        dto.getAdmissionYearAsInteger() + "_" + dto.getJobFunction()));

        return groupedEmployees.entrySet().stream()
                .flatMap(entry -> {
                    String groupKey = entry.getKey();
                    List<EmployeeCsvDto> employees = entry.getValue();

                    log.info("Processing group: {}, employee count: {}", groupKey, employees.size());

                    // 2. 그룹 내에서 정렬 (이름 -> 성별 -> 생년월일)
                    employees.sort(getEmployeeComparator());

                    // 3. 해당 직무+년도 조합에서 마지막 순번 조회
                    String[] parts = groupKey.split("_");
                    int admissionYear = Integer.parseInt(parts[0]);
                    String jobFunctionName = parts[1];
                    String jobCode = getJobCode(jobFunctionName);

                    int lastSequence = getLastSequenceNumber(jobCode, admissionYear);
                    AtomicInteger sequence = new AtomicInteger(lastSequence + 1);

                    return employees.stream().map(dto -> {
                        String employeeNumber = generateEmployeeNumber(
                                jobCode,
                                dto.getAdmissionYearAsInteger(),
                                sequence.getAndIncrement()
                        );

                        return Employee.builder()
                                .employeeNo(employeeNumber)
                                .name(dto.getName())
                                .gender(dto.getGender())
                                .birthDate(dto.getBirthDateAsLocalDate())
                                .jobFunction(dto.getJobFunction())
                                .admissionYear(dto.getAdmissionYearAsInteger())
                                .build();
                    });
                })
                .collect(Collectors.toList());
    }

    // 직원 정렬 기준: 이름(오름차순) -> 성별(남자우선) -> 생년월일(빠른순)
    private Comparator<EmployeeCsvDto> getEmployeeComparator() {
        return Comparator
                .comparing(EmployeeCsvDto::getName)
                .thenComparing(dto -> dto.getGender().equals("남") ? 0 : 1)
                .thenComparing(EmployeeCsvDto::getBirthDateAsLocalDate);
    }

    // 직무명으로 직무코드 조회
    private String getJobCode(String jobFunctionName) {
        JfDepartment department = jfDepartmentRepository.findByJfName(jobFunctionName)
                .orElseThrow(() -> new IllegalArgumentException(
                        "존재하지 않는 직무입니다: " + jobFunctionName));
        return department.getJfCode();
    }

    // 해당 직무+년도에서 마지막 순번 조회
    private int getLastSequenceNumber(String jobCode, int admissionYear) {
        // 사번 패턴: 직무코드(2자리) + 입사년도(2자리) + 순번(3자리)
        String yearSuffix = String.format("%02d", admissionYear % 100); // 년도를 2자리로
        String employeeNumberPrefix = jobCode + yearSuffix;

        // 해당 패턴으로 시작하는 사번 중 가장 큰 순번 조회
        List<String> existingEmployeeNumbers = employeeRepository.findEmployeeNumbersByPrefix(employeeNumberPrefix);

        return existingEmployeeNumbers.stream()
                .mapToInt(empNo -> {
                    if (empNo.length() >= 7) {
                        String sequencePart = empNo.substring(4); // 뒤 3자리 순번
                        try {
                            return Integer.parseInt(sequencePart);
                        } catch (NumberFormatException e) {
                            return 0;
                        }
                    }
                    return 0;
                })
                .max()
                .orElse(0); // 기존 사번이 없으면 0 반환
    }

    // 사번 생성: 직무코드(2자리) + 입사년도(2자리) + 순번(3자리)
    // 예: EC19002 (비교과센터, 2019년, 2번째)
    private String generateEmployeeNumber(String jobCode, Integer admissionYear, int sequence) {
        String yearSuffix = String.format("%02d", admissionYear % 100);
        return String.format("%s%s%03d", jobCode, yearSuffix, sequence);
    }
}