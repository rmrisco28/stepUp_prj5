package com.example.backend.competencyAssessment.entity;

import com.example.backend.competency.entity.SubCompetency;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "question", schema = "prj5", uniqueConstraints =
@UniqueConstraint(columnNames = {"ca_seq", "question_num"}))  // 복합 유니크 제약 설정

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_seq", nullable = false)
    private Integer seq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ca_seq", nullable = false)
    private Assessment caSeq;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sub_competency_seq", nullable = false)
    private SubCompetency subCompetencySeq;

    @Column(name = "question_num", nullable = false)
    private Integer questionNum;

    @Column(name = "question", nullable = false, length = 200)
    private String question;

    @Column(name = "score", nullable = false)
    private Double score;

}