package com.example.backend.batch.employee.service;

import com.example.backend.batch.employee.dto.EmployeeCsvDto;
import com.example.backend.batch.employee.entity.Employee;
import com.example.backend.batch.employee.entity.JfDepartment;
import com.example.backend.batch.employee.repository.EmployeeRepository;
import com.example.backend.batch.employee.repository.JfDepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        // 1. 직무별로만 그룹핑 (입사년도는 상관없이)
        Map<String, List<EmployeeCsvDto>> groupedEmployees = csvDataList.stream()
                .collect(Collectors.groupingBy(EmployeeCsvDto::getJobFunction));
        // 즉 여기서 '비교과센터' 나 '역량관리센터'로 그룹핑 하니까

        return groupedEmployees.entrySet().stream()
                .flatMap(entry -> {
                    String groupKey = entry.getKey();
                    List<EmployeeCsvDto> employees = entry.getValue();

                    log.info("Processing group: {}, employee count: {}", groupKey, employees.size());

                    // 2. 그룹 내에서 정렬 (입사일 -> 이름 -> 성별 -> 생년월일)
                    employees.sort(getEmployeeComparator());

                    // 3. 해당 직무에서 마지막 순번 조회
                    // groupKey 자체가 '비교과센터'등의 이름이 됨
                    String jobCode = getJobCode(groupKey);

                    int lastSequence = getLastSequenceNumber(jobCode);
                    AtomicInteger sequence = new AtomicInteger(lastSequence + 1);

                    return employees.stream()
                            .filter(dto -> !isDuplicateEmployee(dto)) // 중복 체크
                            .map(dto -> {
                                String employeeNumber = generateEmployeeNumber(
                                        jobCode,
                                        dto.getHireDateAsLocalDate(),
                                        sequence.getAndIncrement()
                                );

                                return Employee.builder()
                                        .employeeNo(employeeNumber)
                                        .name(dto.getName())
                                        .gender(dto.getGender())
                                        .birthDate(dto.getBirthDateAsLocalDate())
                                        .jobFunction(dto.getJobFunction())
                                        .hireDate(dto.getHireDateAsLocalDate())
                                        .build();
                            });
                })
                .collect(Collectors.toList());
    }

    // 직원 정렬 기준: 입사일(빠른순) -> 이름(오름차순) -> 성별(남자우선) -> 생년월일(빠른순)
    private Comparator<EmployeeCsvDto> getEmployeeComparator() {
        return Comparator
                .comparing(EmployeeCsvDto::getHireDateAsLocalDate)
                .thenComparing(EmployeeCsvDto::getName)
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

    // 중복 직원 체크 (이름, 생년월일, 성별로 판단)
    private boolean isDuplicateEmployee(EmployeeCsvDto dto) {
        return employeeRepository.existsByNameAndBirthDateAndGender(
                dto.getName(),
                dto.getBirthDateAsLocalDate(),
                dto.getGender()
        );
    }

    // 해당 직무에서 마지막 순번 조회
    private int getLastSequenceNumber(String jobCode) {
        // 해당 직무으로 시작하는 사번 중 가장 큰 순번 조회
        List<String> existingEmployeeNumbers = employeeRepository.findEmployeeNumbersByPrefix(jobCode);

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
    // 예: EC19002 (비교과센터, 2019년 입사, 해당 부서 2번째)
    private String generateEmployeeNumber(String jobCode, LocalDate hireDate, int sequence) {
        String yearSuffix = String.format("%02d", hireDate.getYear() % 100);
        return String.format("%s%s%03d", jobCode, yearSuffix, sequence);
    }
}