package com.example.backend.batch.employee.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Entity
@Table(name = "employee", schema = "prj5")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_seq", nullable = false)
    private Integer id;

    @Column(name = "employee_no", length = 20)
    private String employeeNo;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "gender", nullable = false, length = 5)
    private String gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "job_function", nullable = false, length = 30)
    private String jobFunction;

    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 50)
    private String email;

    // jdbc
    @OneToOne
    @JoinColumn(name = "member_seq")
    private Member memberSeq;
}