package com.example.backend.batch.employee.dto;

import com.opencsv.bean.CsvBindByPosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCsvDto {

    @CsvBindByPosition(position = 0)
    private String name;

    @CsvBindByPosition(position = 1)
    private String gender;

    @CsvBindByPosition(position = 2)
    private String birthDate; // CSV에서는 문자열로 받아서 나중에 LocalDate로 변환

    @CsvBindByPosition(position = 3)
    private String jobFunction;

    @CsvBindByPosition(position = 4)
    private String hireDate; // CSV에서는 문자열로 받아서 나중에 LocalDate로 변환

    // 편의 메서드
    public LocalDate getBirthDateAsLocalDate() {
        return LocalDate.parse(birthDate);
    }

    public LocalDate getHireDateAsLocalDate() {
        return LocalDate.parse(hireDate);
    }
}
