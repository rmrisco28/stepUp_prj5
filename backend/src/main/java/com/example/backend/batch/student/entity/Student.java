package com.example.backend.batch.student.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Entity
@Table(name = "student", schema = "prj5")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_seq", nullable = false)
    private Integer id;

    @Column(name = "student_no", length = 20)
    private String studentNo;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "gender", nullable = false, length = 5)
    private String gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "major", nullable = false, length = 30)
    private String major;

    @Column(name = "admission_year", nullable = false)
    private Integer admissionYear;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 50)
    private String email;

    // jdbc
//    @Column(name = "member_seq")
//    private Integer memberSeq;
    // JoinToColumn으로 바꾸기 .. 그러면 가져올 수 있다 ㅜㅜ
    @OneToOne
    @JoinColumn(name = "member_seq")
    private Member member;
}